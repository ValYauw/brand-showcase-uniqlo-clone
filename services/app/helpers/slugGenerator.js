function generateSlug(str) {
  let slug = str.toLowerCase().replace(/\s/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');
  let hashedTimestamp = (+new Date).toString(36);
  slug += '-' + hashedTimestamp;
  return slug;
}

module.exports = generateSlug;