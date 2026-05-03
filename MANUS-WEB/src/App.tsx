import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/Carousel"

export function App() {
  const carouselSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop",
      title: "Slide 1",
      description: "Welcome to our carousel",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=1200&h=400&fit=crop",
      title: "Slide 2",
      description: "Beautiful transitions and effects",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop",
      title: "Slide 3",
      description: "Built with Swiper.js",
    },
  ]

  return (
    <div className="min-h-svh">
      <div className="w-full p-6">
        <Carousel slides={carouselSlides} autoplay={true} effect="fade" />
      </div>
      <div className="flex justify-center p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="font-medium">Carousel Demo</h1>
            <p>You now have a Swiper.js carousel component.</p>
            <Button className="mt-2">Get Started</Button>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            (Press <kbd>d</kbd> to toggle dark mode)
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
