import { Column, Entity } from 'typeorm';
import GlobalConfigModel from 'Common/Models/GlobalConfig';
import TableMetadata from 'Common/Types/Database/TableMetadata';
import IconProp from 'Common/Types/Icon/IconProp';
import Route from 'Common/Types/API/Route';
import CrudApiEndpoint from 'Common/Types/Database/CrudApiEndpoint';
import TableAccessControl from 'Common/Types/Database/AccessControl/TableAccessControl';
import ColumnAccessControl from 'Common/Types/Database/AccessControl/ColumnAccessControl';
import TableColumn from 'Common/Types/Database/TableColumn';
import TableColumnType from 'Common/Types/BaseDatabase/TableColumnType';
import ColumnLength from 'Common/Types/Database/ColumnLength';
import ColumnType from 'Common/Types/Database/ColumnType';
import Email from 'Common/Types/Email';
import Phone from 'Common/Types/Phone';

@TableMetadata({
    tableName: 'GlobalConfig',
    singularName: 'Global Config',
    pluralName: 'Global Configs',
    icon: IconProp.Settings,
    tableDescription: 'Settings for OneUptime Server',
})
@Entity({
    name: 'GlobalConfig',
})
@CrudApiEndpoint(new Route('/global-config'))
@TableAccessControl({
    create: [],
    read: [],
    delete: [],
    update: [],
})
export default class GlobalConfig extends GlobalConfigModel {

    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.ShortText,
        title: 'Host',
        description:
            'Server Hostname or an IP address where OneUptime is hosted on.',
    })
    @Column({
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
        nullable: true,
        unique: true,
    })
    public host?: string = undefined;


    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.Boolean,
        title: 'Use HTTPS',
        description:
            'Is this server hosted on with SSL/TLS?',
    })
    @Column({
        type: ColumnType.Boolean,
        nullable: true,
        unique: true,
    })
    public useHttps?: boolean = undefined;


    // SMTP Settings. 

    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.Boolean,
        title: 'Is SMTP Secure',
        description:
            'Is this SMTP server hosted with SSL/TLS?',
    })
    @Column({
        type: ColumnType.Boolean,
        nullable: true,
        unique: true,
    })
    public isSMTPSecure?: boolean = undefined;


    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.ShortText,
        title: 'SMTP Username',
        description:
            'Username for your SMTP Server',
    })
    @Column({
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
        nullable: true,
        unique: true,
    })
    public smtpUsername?: string = undefined;


    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.ShortText,
        title: 'SMTP Password',
        description:
            'Password for your SMTP Server',
    })
    @Column({
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
        nullable: true,
        unique: true,
    })
    public smtpPassword?: string = undefined;


    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.ShortText,
        title: 'SMTP Host',
        description:
            'Host for your SMTP Server',
    })
    @Column({
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
        nullable: true,
        unique: true,
    })
    public smtpHost?: string = undefined;


    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.Email,
        title: 'SMTP From Email',
        description:
            'Which email should we send mail from?',
    })
    @Column({
        type: ColumnType.Email,
        length: ColumnLength.Email,
        nullable: true,
        unique: true,
        transformer: Email.getDatabaseTransformer()
    })
    public smtpFromEmail?: Email = undefined;


    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.ShortText,
        title: 'SMTP From Name',
        description:
            'Which name should we send emails from?',
    })
    @Column({
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
        nullable: true,
        unique: true,
    })
    public smtpFromName?: string = undefined;


    // Twilio config. 


    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.ShortText,
        title: 'Twilio Account SID',
        description:
            'Account SID for your Twilio Account',
    })
    @Column({
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
        nullable: true,
        unique: true,
    })
    public twilioAccountSID?: string = undefined;


    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.ShortText,
        title: 'Twilio Auth Token',
        description:
            'Auth Token for your Twilio Account',
    })
    @Column({
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
        nullable: true,
        unique: true,
    })
    public twilioAuthToken?: string = undefined;



    @ColumnAccessControl({
        create: [
           
        ],
        read: [
            
        ],
        update: [],
    })
    @TableColumn({
        type: TableColumnType.Phone,
        title: 'Twilio Phone Number',
        description:
            'Phone Number for your Twilio account',
    })
    @Column({
        type: ColumnType.Phone,
        length: ColumnLength.Phone,
        nullable: true,
        unique: true,
        transformer: Phone.getDatabaseTransformer()
    })
    public twilioPhoneNumber?: Phone = undefined;

}