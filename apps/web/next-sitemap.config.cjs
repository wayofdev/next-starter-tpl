/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.APP_URL || 'https://localhost:3000',
  generateRobotsTxt: true,
}
