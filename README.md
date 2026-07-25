# NtNodes | Premium — Discord Bot

A Discord bot for your Minecraft server community: welcome/leave messages, moderation (ban/kick/mute), auto role, a ticket system, a custom embed builder, and a live server status + store plans display — all branded with your NT logo.

## Features

| Command / Event | What it does |
|---|---|
| Join/Leave | Auto-posts a welcome embed when someone joins, a leave embed when they go |
| `/autorole` | Sets the role auto-given to every new member |
| `/ban`, `/kick`, `/mute`, `/unmute` | Moderation commands (mute uses Discord's native timeout) |
| `/ticket-setup` | Posts a button panel — clicking it opens a private ticket channel |
| `/embed` | Opens a form (modal) to build and send a custom embed |
| `/mcstatus` | Shows live players online / MOTD / version for your Minecraft server |
| `/plans` | Shows your store ranks/plans (edit the list in `config.json`) |

---

## Since you're on mobile: easiest way to run this 24/7

You can't easily run a Node.js process from a phone, so host it on a free/cheap always-on platform instead. **Railway** is the simplest option entirely from a mobile browser:

1. Create a GitHub account (if you don't have one) and a new repository from your phone's browser (github.com → "+" → New repository).
2. In the empty repo, tap "uploading an existing file" and select every file from this project at once (they're all loose in one folder — no subfolders to recreate). If your phone can only pick files one at a time, that's fine, just add them all in as many batches as needed and commit each batch.
3. Go to [railway.app](https://railway.app), sign in with GitHub, click **New Project → Deploy from GitHub repo**, and pick your repo.
4. In Railway, open the **Variables** tab and add:
   - `DISCORD_TOKEN` — from the Discord Developer Portal
   - `CLIENT_ID` — your bot's Application ID
   - `GUILD_ID` — your server's ID
5. Set the **Start Command** to `npm install && node deploy-commands.js && npm start` (this installs packages, registers your slash commands, then starts the bot). You only need `node deploy-commands.js` once — after the first successful deploy you can change the start command back to just `npm start`.
6. Railway will build and run it automatically — no terminal needed.

(A Pterodactyl-based Minecraft host that also offers a Node.js/"Generic" egg works too, if your Minecraft host provides one — same steps: upload files, set the token as a variable/startup env, and run `npm install && node deploy-commands.js && node index.js`.)

---

## Getting your Discord credentials

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) → **New Application** → name it (e.g. "NtNodes | Premium").
2. Upload the NT logo as the application icon under **General Information**.
3. Go to **Bot** → **Reset Token** → copy it → this is your `DISCORD_TOKEN`. Keep it secret.
4. Still on the **Bot** page, turn ON these **Privileged Gateway Intents**: `SERVER MEMBERS INTENT` and `MESSAGE CONTENT INTENT`.
5. Copy your **Application ID** from General Information → this is your `CLIENT_ID`.
6. Invite the bot: go to **OAuth2 → URL Generator**, check `bot` and `applications.commands`, then under Bot Permissions check: Manage Roles, Kick Members, Ban Members, Moderate Members, Manage Channels, Manage Messages, Send Messages, Embed Links, Attach Files, Read Message History. Copy the generated URL, open it, and add the bot to your server.
7. Enable Developer Mode in Discord (Settings → Advanced) so you can right-click your server icon → **Copy Server ID** → this is your `GUILD_ID`.

## Configuring `config.json`

Right-click any channel/role in Discord (with Developer Mode on) → Copy ID, then fill these in:

- `welcomeChannelId` / `leaveChannelId` — where join/leave messages post
- `autoRoleId` — role given to new members (or set later with `/autorole`)
- `ticketCategoryId` — category new ticket channels are created under
- `ticketLogChannelId` — where ticket open/close logs post
- `modLogChannelId` — where ban/kick/mute logs post
- `minecraftServerIp` / `minecraftServerPort` — your Minecraft server address
- `plans` — edit the array to match your actual store ranks and prices

Any field you leave as the placeholder text (e.g. `PUT_..._HERE`) is simply skipped — the bot won't break, that feature just won't post anywhere until you fill it in.

## After it's running

In Discord, type `/` in any channel to see all commands. Run `/ticket-setup` once in your support channel to post the ticket button.

## Project structure

Everything sits loose in one folder — no subfolders to worry about:

```
mc-bot-flat/
├── index.js              # bot entry point (auto-detects commands vs events)
├── deploy-commands.js    # registers slash commands (run once after adding/changing commands)
├── config.json           # all your server-specific settings
├── assets/logo.png        # NT logo, used in embeds
├── ban.js, kick.js, mute.js, unmute.js, autorole.js,
│   ticket-setup.js, embed.js, mcstatus.js, plans.js    # commands
├── guildMemberAdd.js, guildMemberRemove.js,
│   ready.js, interactionCreate.js                       # events
└── ticketHandler.js, embedHandler.js                     # shared logic
```
