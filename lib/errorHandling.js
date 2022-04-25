"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reject = void 0;
const common_tags_1 = require("common-tags");
const discord_js_1 = require("discord.js");
const config_1 = require("../assets/config");
const embeds_1 = require("../assets/embeds");
async function reject(interaction, error, timeStarted) {
    if (interaction.replied) {
        await interaction.followUp({ embeds: [embeds_1.Embeds.UNKNOWN_ERROR] });
    }
    else {
        await interaction.reply({ embeds: [embeds_1.Embeds.UNKNOWN_ERROR] });
    }
    console.log("---- RUNTIME ERROR ----");
    console.log("Error:");
    console.error(error);
    console.log("Interaction:");
    console.dir(interaction);
    console.log("Time taken", Date.now() - timeStarted);
    console.log("-----------------------");
    let channel = await interaction.client.channels.fetch(config_1.ERROR_LOGGING_CHANNEL);
    channel && await channel.send({ embeds: [
            new discord_js_1.MessageEmbed()
                .setTitle("Error detected during execution")
                .addField("Time Taken", `${Date.now() - timeStarted}`)
                .addField(`Error: ${error.message}`, error.stack || "")
                .addField("Context", (0, common_tags_1.stripIndents) `
            Interaction Guild Id: ${interaction.guildId}
            Command: ${interaction.isCommand() ? interaction.commandName : "not a command"}
            `)
        ] });
    throw error;
}
exports.reject = reject;
//# sourceMappingURL=errorHandling.js.map