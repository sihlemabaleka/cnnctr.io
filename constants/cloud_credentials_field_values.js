const credential_fields = {
    AWS: {
        region: {
            type: 'select',
            value: [
                'us-east-1'
            ]
        },
        access_key: {
            type: 'input'
        },
        secret_key: {
            type: 'input'
        }
    },
    AzureApp: {
        tenant_id: {
            type: 'input'
        },
        client_id: {
            type: 'input'
        },
        client_secret: {
            type: 'input'
        },
        resource_id: {
            type: 'input'
        },
        site_domain: {
            type: 'input'
        }
    }
}

export default credential_fields