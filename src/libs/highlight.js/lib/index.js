var hljs = require('./highlight');

hljs.registerLanguage('bash', require('./languages/bash'));
hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('cpp', require('./languages/cpp'));
hljs.registerLanguage('java', require('./languages/java'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('python', require('./languages/python'));
hljs.registerLanguage('rust', require('./languages/rust'));
hljs.registerLanguage('sql', require('./languages/sql'));
hljs.registerLanguage('xml', require('./languages/xml'));

module.exports = hljs;