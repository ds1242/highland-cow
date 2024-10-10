

export default function Footer() {

    const d: Date = new Date()
    let year: Number = d.getFullYear()

    return (
        <footer className="bg-slate-600 grid grid-rows-1 auto-cols-max justify-center align-middle absolute bottom-0 inset-x-0 h-14 min-h-0">
            <p className="text-base">
                Created with care by David Shaw &copy; {year.toString()}
            </p>
        </footer>
    )
}