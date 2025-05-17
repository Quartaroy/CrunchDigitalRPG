Hooks.once("init", () => {
  console.log("My System | Initializing system");

  // Register custom document class (optional)
  CONFIG.Actor.documentClass = MySystemActor;

  // Register custom sheet
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("my-system", MySystemActorSheet, {
    label: "My Character Sheet",
    types: ["character"],
    makeDefault: true
  });
});

// Optional: Custom Actor class
class MySystemActor extends Actor {
  prepareData() {
    super.prepareData();
    // Additional processing here if needed
  }
}

class MySystemActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["my-system", "sheet", "actor"],
      template: "systems/my-system/templates/actor-sheet.html",
      width: 400,
      height: 300
    });
  }

  async getData(options) {
    const context = await super.getData(options);
    // No need to return `actor.data` — Foundry v13 already exposes `actor.system`
    return context;
  }
}
