import * as yup from "yup";

const AWSCredentialSchema = yup
    .object({
        service: yup.string().required(),
        region: yup.string(),
        accessKey: yup.string().required(),
        secretKey: yup.string().required(),
    })
    .required()

const AzureCredentialSchema = yup
    .object({
        service: yup.string().required(),
        tenantId: yup.string().required(),
        clientId: yup.string().required(),
        clientSecret: yup.string().required(),
        resourceId: yup.string().required(),
        siteDomain: yup.string().required(),
    })
    .required()

const MongoDBCredentialSchema = yup
    .object({
        service: yup.string().required(),
        connectionString: yup.string().required(),
    })
    .required()

const FirebaseServiceAccountSchema = yup
    .object({
        service: yup.string().required(),
        type: yup.string().required(),
        project_id: yup.string().required(),
        private_key_id: yup.string().required(),
        private_key: yup.string().required(),
        client_email: yup.string().required(),
        client_id: yup.string().required(),
        auth_uri: yup.string().required(),
        token_uri: yup.string().required(),
        auth_provider_x509_cert_url: yup.string().required(),
        client_x509_cert_url: yup.string().required(),
    })
    .required()

const PostgresqlSchema = yup
    .object({
        service: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
        host: yup.string().required(),
        port: yup.string().required(),
        database: yup.string().required(),
    })
    .required()

const WooCommerceSchema = yup
    .object({
        service: yup.string().required(),
        url: yup.string().required(),
        consumerKey: yup.string().required(),
        consumerSecret: yup.string().required(),
        version: yup.string(),
    })
    .required()

const ShopifySchema = yup
    .object({
        service: yup.string().required(),
        shopName: yup.string().required(),
        isPrivate: yup.boolean().required(),
        apiKey: yup.string().when('isPrivate', {
            is: true,
            then: yup.string().required(),
        }),
        password: yup.string().when('isPrivate', {
            is: true,
            then: yup.string().required(),
        }),
        accessToken: yup.string().when('isPrivate', {
            is: false,
            then: yup.string().required(),
        }),
        apiVersion: yup.string(),
    })
    .required()

const PayStackCredentialSchema = yup
    .object({
        service: yup.string().required(),
        clientSecret: yup.string().required(),
    })
    .required()

const PayFastCredentialSchema = yup
    .object({
        service: yup.string().required(),
        merchentId: yup.string().required(),
        passphrase: yup.string().required(),
        version: yup.string(),
    })
    .required()

const DropboxCredentialSchema = yup
    .object({
        service: yup.string().required(),
        clientId: yup.string().required(),
        clientSecret: yup.string().required(),
        redirectUri: yup.string(),
    })
    .required()

export default Object.assign({
    AWSCredentialSchema,
    AzureCredentialSchema,
    MongoDBCredentialSchema,
    FirebaseServiceAccountSchema,
    PostgresqlSchema,
    WooCommerceSchema,
    ShopifySchema,
    PayStackCredentialSchema,
    PayFastCredentialSchema,
    DropboxCredentialSchema
})