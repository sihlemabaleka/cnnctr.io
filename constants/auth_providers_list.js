import Image from 'next/image';

export const auth_providers_list = [
    {
        name: 'Google',
        service: 'google',
        category: 'Auth',
        description: 'Google Sign-In manages the OAuth 2.0 flow and token lifecycle, simplifying your integration with Google APIs. A user always has the option to revoke access to an application at any time.',
        image: '/logos/google-logo.png',
    },
    {
        name: 'Apple',
        service: 'apple',
        category: 'Auth',
        description: 'Sign in with Apple makes it easy for users to sign in to your apps and websites using their Apple ID. Instead of filling out forms, verifying email addresses, and choosing new passwords, they can use Sign in with Apple to set up an account and start using your app right away.',
        image: '/logos/apple-logo.png',
    },
    {
        name: 'Twitter',
        service: 'twitter',
        category: 'Auth',
        description: 'Twitter APIs handle enormous amounts of data. The way we ensure this data is secured for developers and users alike is through authentication.',
        image: '/logos/twitter-logo.png'
    },
    {
        name: 'Metavase',
        service: 'facebook',
        category: 'Auth',
        description: 'Metaverse Login is a fast and convenient way for people to create accounts and log into your app across multiple platforms.',
        image: '/logos/logo-meta.png',
    },
    {
        name: 'Github',
        service: 'github',
        category: 'Auth',
        description: 'You can enable other users to authorize your OAuth App. GitHub\'s OAuth implementation supports the standard authorization code grant type and the OAuth 2.0 Device Authorization Grant for apps that don\'t have access to a web browser.',
        image: '/logos/github-logo.png',
    },
];
