export default function Footer() {

    const d: Date = new Date()
    let year: Number = d.getFullYear()

    return (
        <footer className="bg-slate-700 text-sky-400 grid grid-rows-1 auto-cols-max justify-center inset-x-0 mt-auto">
            <p className="h-14 content-center">
                Created with care by David Shaw &copy; {year.toString()}
            </p>
        </footer>
    )
}