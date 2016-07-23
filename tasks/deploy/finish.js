var utils = require('shipit-utils');
var init = require('../../lib/init');
var fetch = require('node-fetch');
/**
 * Update task.
 * - Emit an event "deployed".
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'deploy:finish', task);

  function task() {
    var shipit = init(utils.getShipit(gruntOrShipit));
    shipit.emit('deployed');

    fetch('https://api.rollbar.com/api/1/deploy/', {
        method: 'POST', body: JSON.stringify({
      access_token: shipit.config.rollbar.api_key,
      environment: shipit.options.environment,
      revision: shipit.config.branch,
      local_username: process.env.USER
      })
    }).then((res) => {
     return res.json();
    }).then((json) => {
     console.log(json);
    });
  }
};
