export default function Footer() {

    const d: Date = new Date()
    let year: Number = d.getFullYear()

    return (
        <footer className="bg-neutral-one text-brand grid grid-rows-1 auto-cols-max justify-center inset-x-0 mt-auto">
            <p className="h-14 content-center">
                Created with care by David Shaw &copy; {year.toString()}
            </p>
        </footer>
    )
}