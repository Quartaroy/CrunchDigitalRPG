import { CrunchActor } from "./documents/actor.mjs";
import { CrunchItem } from "./documents/item.mjs"; // Already imported
import { CrunchActorSheet } from "./sheets/actor-sheet.mjs";
import { CrunchItemSheet } from "./sheets/item-sheet.mjs"; // Already imported

Hooks.once("init", () => {
  console.log("🧠 [CRUNCH] Init hook running");

  CONFIG.Actor.documentClass = CrunchActor;
  CONFIG.Item.documentClass = CrunchItem; // Register your custom Item document class

  // Optional: unregister core sheet cleanly
  foundry.documents.collections.Actors.unregisterSheet(
    "core",
    foundry.appv1.sheets.ActorSheet
  );
  foundry.documents.collections.Items.unregisterSheet( // Unregister core Item sheet
    "core",
    foundry.appv1.sheets.ItemSheet
  );

  // Updated to use proper V13 namespace for Actors
  foundry.documents.collections.Actors.registerSheet("crunch", CrunchActorSheet, {
    label: "Crunch Actor Sheet",
    types: ["entity"],
    makeDefault: true
  });

  // Register your custom Item Sheet for the "action" type
  foundry.documents.collections.Items.registerSheet("crunch", CrunchItemSheet, {
    label: "Crunch Action Item Sheet", // Label for your item sheet
    types: ["action"],                 // Crucial: Register for the "action" type
    makeDefault: true                  // Make this the default sheet for "action" items
  });

  console.log("✅ [CRUNCH] CrunchActor and custom sheet registered for 'entity'");
  console.log("✅ [CRUNCH] CrunchItem and custom sheet registered for 'action'"); // New log for clarity
});