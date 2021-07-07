const R = require('ramda')

const extractCaptions =
  (post) =>
    post.edge_media_to_parent_comment
        ? post.edge_media_to_parent_comment.edges
        : undefined

const extractDisplayResources =
  (post) =>
    post.is_video
        ? Array(post.video_url)
        : R.isNil(post.edge_sidecar_to_children)
          ? Array(R.last(post.display_resources))
          : post.edge_sidecar_to_children
            .edges
            .map(
              y => y.node.is_video
                ? { src: y.node.video_url }
                : R.last(y.node.display_resources)
            )

module.exports = { extractCaptions, extractDisplayResources }
