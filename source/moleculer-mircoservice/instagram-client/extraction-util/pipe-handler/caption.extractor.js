const extractCaptions =
  (collection) =>
    collection.then(
      x => x.edge_media_to_parent_comment
        ? x.edge_media_to_parent_comment.edges
        : Array()
    )

module.exports = { extractCaptions }
