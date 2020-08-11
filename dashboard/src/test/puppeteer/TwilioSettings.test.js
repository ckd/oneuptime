const puppeteer = require('puppeteer');
const utils = require('./test-utils');
const init = require('./test-init');
const { Cluster } = require('puppeteer-cluster');
require('should');

// user credentials
const email = utils.generateRandomBusinessEmail();
const password = '1234567890';
const { twilioCredentials } = { ...utils };

const projectName = 'project';
const componentName = 'component1';
const monitorName = 'monitor1';
const phoneNumber = '9173976235';
const incidentTitle = utils.generateRandomString();

describe('Custom Twilio Settings', () => {
    const operationTimeOut = 500000;

    let cluster;
    beforeAll(async done => {
        jest.setTimeout(360000);
        cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_PAGE,
            puppeteerOptions: utils.puppeteerLaunchConfig,
            puppeteer,
            timeout: 500000,
        });

        cluster.on('error', err => {
            throw err;
        });

        await cluster.execute({ email, password }, async ({ page, data }) => {
            const user = {
                email: data.email,
                password: data.password,
            };
            // user
            await init.registerUser(user, page);
            await init.loginUser(user, page);
            await init.addProject(page, projectName);
        });

        done();
    });

    afterAll(async done => {
        await cluster.idle();
        await cluster.close();
        done();
    });

    test(
        'should create a custom twilio settings',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.click('#projectSettings');
                await page.waitForSelector('#email');
                await page.click('#sms');
                await page.waitForSelector('label[for=smssmtpswitch]', {
                    visible: true,
                });
                await page.click('label[for=smssmtpswitch]');
                await page.type('#accountSid', twilioCredentials.accountSid);
                await page.type('#authToken', twilioCredentials.authToken);
                await page.type('#phoneNumber', twilioCredentials.phoneNumber);
                await page.click('#submitTwilioSettings');
                await page.waitFor(3000);
                await page.reload();
                await page.waitForSelector(
                    '#accountSid',
                    twilioCredentials.accountSid
                );
                const savedAccountSid = await page.$eval(
                    '#accountSid',
                    elem => elem.value
                );
                expect(savedAccountSid).toBe(twilioCredentials.accountSid);
            });

            done();
        },
        operationTimeOut
    );

    test(
        'should send SMS to external subscribers if an incident is created.',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await init.addMonitorToComponent(
                    componentName,
                    monitorName,
                    page
                );
                await page.waitForSelector(`#more-details-${monitorName}`);
                await page.click(`#more-details-${monitorName}`);
                await page.waitForSelector('#addSubscriberButton');
                await page.click('#addSubscriberButton');
                await init.selectByText('#alertViaId', 'SMS', page);
                await page.waitForSelector('#countryCodeId');
                await init.selectByText('#countryCodeId', '+1', page);
                await page.type('#contactPhoneId', phoneNumber);
                await page.click('#createSubscriber');

                await page.waitForSelector(`#createIncident_${monitorName}`);
                await page.click(`#createIncident_${monitorName}`);
                await page.waitForSelector('#createIncident');
                await init.selectByText('#incidentType', 'Offline', page);
                await page.type('input[name=title]', incidentTitle);
                await page.click('#createIncident');
                await page.waitFor(3000);
                await page.waitForSelector(
                    '#incident_monitor1_0 > td:nth-child(2)'
                );
                await page.$eval('#incident_monitor1_0 > td:nth-child(2)', e =>
                    e.click()
                );
                await page.waitForSelector(
                    '#subscriberAlertTable>tbody>tr>td:nth-child(2)'
                );
                const receiverPhoneNumber = await page.$eval(
                    '#subscriberAlertTable>tbody>tr>td:nth-child(2)',
                    e => e.textContent
                );
                expect(receiverPhoneNumber).toEqual(phoneNumber);
            });

            done();
        },
        operationTimeOut
    );
});
