function splitTags (tagString) {
  let tags = (tagString || '').split(',')
  let results = []
  tags.forEach(function (tag) {
    if (tag) {
      results.push(tag)
    }
  })
  return results
}

export default {
  methods: {
    splitTags
  }
}  