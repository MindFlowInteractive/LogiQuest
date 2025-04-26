# Contributing to LogicQuest

Thank you for your interest in contributing to LogicQuest! This guide will help you get started and while you are here do well to join our Telegram at [MindFlowInteractive](https://t.me/+uwmcBHURU_1kYjJk).

### Important Note Before Applying 📝  
⚠️ **Avoid Generic Comments:** Comments such as 🚫 
"Can I help with this?" 🚫 
"I’d love to contribute!" 🚫 
"Check out my profile!" or 🚫 
"Can I work on this?"... these will not be considered.  

Instead, provide a **clear explanation of your approach**, which includes:  

- A brief introduction about yourself.  
- A concise plan outlining how you will address the issue (3–6 lines max).  
- Your estimated completion time (ETA).
We are excited to have you contribute to **LogicQuest**! Whether you're fixing bugs, adding new features, or enhancing the game design, your input will help make the game more fun and challenging!

## How to Contribute

### 1. Fork the Repository
- Fork the repository to your own GitHub account by clicking the "Fork" button at the top of the repository.

### 2. Clone the Forked Repository
```bash
git clone https://github.com/your-username/logicquest.git
cd logicquest
```

### 3. In your forked repo, Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

### 4. Make your changes

### 5.  Commit with clear messages:

   ```bash
   git commit -m "Add: brief description of changes"
   ```

### 6. Push to your fork:

   ```bash
   git push origin feature-name
   ```
### 7 Dependency Management - Dependency Locking


We use strict dependency locking to ensure consistent builds across all environments.

- **Never** run `npm install` to add packages. Instead, use:
  ```bash
  npm install <package-name> --save-exact
  ```
- **Always** commit the `package-lock.json` file along with your changes.
- When pulling from the repository, use `npm ci` instead of `npm install` to ensure exact dependency versions are installed.
- If you encounter dependency conflicts, do not use `--force` or `--legacy-peer-deps` without discussing with the team first.

### Version Management
- Major version updates (e.g., NestJS 10.x to 11.x) should be planned and coordinated with the team.
- Ensure all related packages use compatible versions. For example:
   - All NestJS packages should use the same major version
   - Starknet and related packages should use compatible versions

### Before Submitting a PR
- Run `npm ls --json > /dev/null` to verify dependency tree integrity
- Run `npm audit` to check for security vulnerabilities
- Make sure your code works with the locked dependencies

```
Copy
```

You can expand or modify this based on your team's specific needs and practices.

### 8. Submit a Pull Request that properly describes your changes


## Code of Conduct

- Follow ethical coding practices.
- Do not submit a Pull request unless you are assigned.
- Tasks must be completed within the specified deadline.
- Always reach out to the maintainer if you get stuck.
- Ensure all tests pass.
- Request reviews from maintainers, when you submit a PR.

## Starknet Development Setup

For Starknet integration, contributors need to:

1. Create an Alchemy account and set up a Starknet Goerli (testnet) app
2. Generate a test wallet for development (never use real wallets with funds)
3. Copy the API key and wallet information to your .env file

### Generating a test wallet

You can generate a test wallet using:
- Argent X browser extension (switch to testnet)
- Braavos wallet (switch to testnet)
- Programmatically using starknet.js (see documentation)

## Generating Starknet Test Keys

To generate a Starknet private key and address for development:

```bash
npm run generate-starknet-key
```
This approach provides a convenient way for contributors to generate test keys without having to write code themselves, and keeps the key generation separate from your main application code.

Note: Always use testnet for development and never commit private keys to the repository.

## Blockchain Configuration

LogiQuest uses blockchain technology for NFT rewards and achievements. For development purposes, you'll need:

### Ethereum Configuration (for NFT rewards)

1. **Get an Ethereum RPC URL**:
   - Sign up for a free account on [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
   - Create a new app and select Ethereum Goerli testnet
   - Copy the HTTP URL provided

2. **Generate an Ethereum private key** (for development only):
   - Use an online generator like [vanity-eth](https://vanity-eth.tk/)
   - Or generate using ethers.js: `const { Wallet } = require('ethers'); console.log(Wallet.createRandom().privateKey);`
   - Always use testnet for development and never share private keys

### Starknet Configuration (for blockchain interactions)

1. **Get a Starknet API key**:
   - Sign up for an Alchemy account
   - Create a new app selecting Starknet Goerli testnet
   - Copy your API key

2. **Generate a Starknet wallet**:
   - Use Argent X or Braavos browser extension to create a testnet wallet
   - Fund it with testnet tokens from the Starknet faucet

Add these values to your `.env` file based on the template in `.env.example`.

**Note:** The application includes fallback mock implementations for development, so blockchain configuration is optional for contributors not working directly on blockchain features.

## License

This project is licensed under the [MIT License](LICENSE).

