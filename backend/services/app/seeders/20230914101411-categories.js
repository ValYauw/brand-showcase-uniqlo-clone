'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rawData = JSON.parse(fs.readFileSync('../../../data/categories.json'));
    const seedData = rawData.map(el => {
      let { id, name, createdAt, updatedAt } = el;
      createdAt = new Date(createdAt);
      updatedAt = new Date(updatedAt);
      return { id, name, createdAt, updatedAt }
    });
    await queryInterface.bulkInsert('Categories', seedData);
    await queryInterface.sequelize.query(`ALTER SEQUENCE public."Categories_id_seq" RESTART WITH ${seedData.at(-1).id + 1};`)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
