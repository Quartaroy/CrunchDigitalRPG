export class CrunchActorSheet extends foundry.applications.api.DocumentSheetV2 {
  constructor(...args) {
    super(...args);
    console.log("🎯 CrunchActorSheet constructed", this);
    
    // Register the JSON helper for Handlebars if it doesn't exist
    if (!Handlebars.helpers.json) {
      Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context, null, 2);
      });
    }
  }

  /**
   * @override
   * Defines the HTML template for this sheet.
   */
  get template() {
    return `systems/crunch/templates/actor-sheet.html`;
  }

  /**
   * @override
   * Defines default options for the sheet.
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "crunch-actor-sheet",
      classes: ["crunch", "sheet", "actor"],
      title: "Crunch Actor Sheet",
      width: 600,
      height: "auto", 
      resizable: true,
      // If you are not yet using tabs in your HTML, you can keep this line commented out.
      // tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }] 
    });
  }

  /**
   * Getter for the Actor document (this.object).
   */
  get actor() {
    return this.object;
  }

  /**
   * @override
   * Prepares the data object that will be passed to the Handlebars template.
   */
  async getData(options={}) {
    const context = await super.getData(options); 
    context.actor = this.actor; 

    context.debug = {
      actorData: this.actor.toObject(), 
      hasSystem: !!this.actor.system, 
      templatePath: this.template,
      renderTime: Date.now()
    };
    
    console.log("🔍 Final sheet context (from getData):", context); 
    return context;
  }

  /**
   * @override
   * REQUIRED for ApplicationV2 subclasses.
   * Render an HTMLElement for the Application.
   * @param {object} context The data context for the render operation.
   * @param {object} options Options which configure application rendering behavior.
   * @returns {Promise<HTMLElement>} The root HTML element of the rendered application.
   */
  async _renderHTML(context, options) {
    console.log("🎨 _renderHTML: Rendering template for context:", context);
    const htmlString = await foundry.applications.handlebars.renderTemplate(this.template, context);
    
    // Create a temporary element to parse the HTML string, then return its first child.
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.firstElementChild; // Returns the root HTMLElement (e.g., your <form> element)
  }

  /**
   * @override
   * REQUIRED for ApplicationV2 subclasses.
   * Replace the HTML of the application with the result provided by _renderHTML.
   * @param {HTMLElement} result The HTMLElement returned by _renderHTML.
   * @param {HTMLElement} content The content element into which the rendered result must be inserted.
   * @param {object} options Options which configure application rendering behavior.
   */
  async _replaceHTML(result, content, options) {
    console.log("🔄 _replaceHTML: Replacing HTML content.");
    // Clear existing content
    while (content.firstChild) {
      content.removeChild(content.lastChild);
    }
    // Append the new content
    content.appendChild(result); 

    await super._replaceHTML(result, content, options);
  }

  /**
   * @override
   * This method is called after the sheet's HTML has been rendered and added to the DOM.
   * It's the place to attach event listeners (e.g., for buttons, input changes, drag-and-drop).
   */
  activateListeners(html) {
    // Always call the parent's activateListeners method first!
    super.activateListeners(html); 

    // Place any of your custom event listeners here.
    // html is still a jQuery object here for convenience.
    // Example:
    // html.find('.my-custom-button').on('click', this._onMyButtonClick.bind(this));
  }
}