import { Carousel } from "@/components/Carousel"

export function App() {
  const carouselSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
      title: "Project 1",
      description: "Premium printing solution",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=1200&h=600&fit=crop",
      title: "Project 2",
      description: "Large format excellence",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
      title: "Project 3",
      description: "Branding solutions",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
      title: "Project 4",
      description: "UV printing expertise",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1571115764595-644a12c606a0?w=1200&h=600&fit=crop",
      title: "Project 5",
      description: "Signage solutions",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1584421789516-d3e524b1d8e9?w=1200&h=600&fit=crop",
      title: "Project 6",
      description: "Design expertise",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=600&fit=crop",
      title: "Project 7",
      description: "Print innovation",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop",
      title: "Project 8",
      description: "Quality assurance",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=600&fit=crop",
      title: "Project 9",
      description: "Finishing perfection",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1591290621749-2826cc09ce4d?w=1200&h=600&fit=crop",
      title: "Project 10",
      description: "Fast delivery",
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1588008949212-4b958801b base?w=1200&h=600&fit=crop",
      title: "Project 11",
      description: "Premium materials",
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
      title: "Project 12",
      description: "Complete solutions",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Print Projects Section */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Featured <span className="text-red-600">Print Projects</span>
            </h2>
            <p className="text-lg text-gray-600">
              Scroll through a longer, seamless portfolio of UAE print
              installations and branding solutions.
            </p>
          </div>

          {/* Carousel */}
          <div className="w-full">
            <Carousel slides={carouselSlides} autoplay={true} effect="slide" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
