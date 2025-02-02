require('dotenv').config();
require('./keep_alive');

// Importation des modules nécessaires
const { Client, GatewayIntentBits, Events, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// Identifiants des salons et des émojis
const WELCOME_CHANNEL_ID = '1328415476765950024';
const IMAGE_CHANNEL_ID = '1328465983135809598';
const EMOJI_1 = '<:a_smash_sarang:1331194061335429150>';
const EMOJI_2 = '<:a_pass_sarang:1331194062442725377>';

// Quand un nouveau membre rejoint le serveur
client.on(Events.GuildMemberAdd, async (member) => {
    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!channel) return;

    // Envoie un message mentionnant le nouveau membre
    const message = await channel.send(`${member}`);

    // Supprime le message après quelques secondes
    setTimeout(() => {
        message.delete().catch(console.error);
    }, 1000); // 1 secondes
});

// Quand un message est envoyé dans le salon d'images
client.on(Events.MessageCreate, async (message) => {
    // Vérifie si le message est dans le bon salon et contient une image
    if (message.channel.id === IMAGE_CHANNEL_ID && message.attachments.size > 0) {
        try {
            // Ajoute les émojis au message
            await message.react(EMOJI_1);
            await message.react(EMOJI_2);
        } catch (error) {
            console.error
        }
    }
});

// Connexion du bot
client.once(Events.ClientReady, () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

// Connexion du bot (remplacez 'YOUR_BOT_TOKEN' par le token de votre bot)
client.login(process.env.TOKEN);
