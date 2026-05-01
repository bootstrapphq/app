export function createTemplateManager(ide) {
  const templates = new Map();

  return {
    getAllTemplates: () => [...templates.values()],
    getTemplate: (id) => templates.get(id) || null,
    loadTemplate: async (id) => templates.get(id) || null,

    register(template) {
      templates.set(template.id, { ...template, _loaded: true });
      ide.emit("templatesChanged");
    },

    unregister(templateId) {
      templates.delete(templateId);
      ide.emit("templatesChanged");
    },
  };
}
