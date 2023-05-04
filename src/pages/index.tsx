import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import * as d3 from "d3";
import { HEIGHT, WIDTH, drawGraph } from "./drawGraph";
import './styles.css'
/// * randomly distribute the nodes
/// * change the node distribution (force-directed layout (Fruchterman-Reingold)
/// - draw the edges (directed)
/// - add hover node, onClick show metadata
/// - node color/radius
/// - filters
///    --  country
///    --  audience
///    --  new/returning 
///    --  Average order value 
/// - call the APIs and actualize data 

const graph = ({
  nodes: Array.from({ length: 13 }, () => ({})),
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 0 },
    { source: 2, target: 0 },
    { source: 1, target: 3 },
    { source: 3, target: 2 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
    { source: 5, target: 6 },
    { source: 5, target: 7 },
    { source: 6, target: 7 },
    { source: 6, target: 8 },
    { source: 7, target: 8 },
    { source: 9, target: 4 },
    { source: 9, target: 11 },
    { source: 9, target: 10 },
    { source: 10, target: 11 },
    { source: 11, target: 12 },
    { source: 12, target: 10 }
  ]
})


const IndexPage: React.FC<PageProps> = () => {
  const ref = React.useRef();
  React.useEffect(() => {
    drawGraph(d3.select(ref.current), graph);
  }, [])

  return (
    <main style={{ position: 'relative' }}>
      <svg
        className="wrapper"
        style={{ marginLeft: '50%', border: '5px solid #000', position: "absolute", left: -1 * WIDTH / 2 }}
        width={WIDTH}
        height={HEIGHT}
        ref={ref}
      />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
