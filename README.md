# Master Base

Master Base is an open source project of [Live for Speed](https://lfs.net/) Master Server that allows players to host their own master server to play with friends.

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) v20.2.0 or higher
- [pnpm](https://pnpm.io/) v8.10.5 or higher

### Steps

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Copy `.env.example` to `.env` and fill the values
4. Build the project with `pnpm build`
5. Run the project with `pnpm start`

### Inside game

1. In windows, you'll need to edit the hosts file. You can find it in: `C:\Windows\System32\drivers\etc\hosts`
2. In cmd or powershell, run the following command: `ipconfig/flushdns`
3. Add the following line to the file: `<ip of master server> master.lfs.net`
4. Save the file and start the game

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Master Base is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
