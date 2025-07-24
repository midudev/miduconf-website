export default function TestPage({ slug }: { slug: string }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Dynamic Route</h1>
      <p>Slug: {slug}</p>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  console.log('Test route params:', params)
  
  return {
    props: {
      slug: params.slug
    }
  }
}