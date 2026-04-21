(function () {
    if (!('modelContext' in navigator) || typeof navigator.modelContext.provideContext !== 'function') {
        return;
    }

    var insurancePages = [
        '/assurance-voyage.html',
        '/assurance-prenatalite.html',
        '/assurance-lca.html',
        '/assurance-animaux.html',
        '/nouveau-resident.html'
    ];

    var context = {
        tools: [
            {
                name: 'navigate_to_quote_form',
                description: 'Open the homepage quote form section.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        section: {
                            type: 'string',
                            enum: ['simulator', 'hero'],
                            default: 'simulator'
                        }
                    },
                    additionalProperties: false
                },
                execute: function (input) {
                    var section = input && input.section ? input.section : 'simulator';
                    var target = '/' + '#' + section;
                    window.location.assign(target);
                    return {
                        ok: true,
                        target: target
                    };
                }
            },
            {
                name: 'list_insurance_pages',
                description: 'List the key insurance pages available on assurator.ch.',
                inputSchema: {
                    type: 'object',
                    properties: {},
                    additionalProperties: false
                },
                execute: function () {
                    return {
                        ok: true,
                        pages: insurancePages
                    };
                }
            }
        ]
    };

    navigator.modelContext.provideContext(context).catch(function (error) {
        console.warn('WebMCP registration failed:', error);
    });
})();
