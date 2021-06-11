const R = require('ramda')

const extractDisplayResources =
  (collection) =>
    collection.then(
      x => x.is_video
        ? Array(x.video_url)
        : R.isNil(x.edge_sidecar_to_children)
          ? Array(R.last(x.display_resources))
          : x.edge_sidecar_to_children
            .edges
            .map(
              y => y.node.is_video
                ? { src: y.node.video_url }
                : R.last(y.node.display_resources)
            )
    )

module.exports = { extractDisplayResources }
