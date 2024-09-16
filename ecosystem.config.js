module.exports = {
  apps : [{
    name   : "billing",
    script: 'npm',
    cwd: '/var/www/html/billing',
    args: 'run start',
  }]
}
