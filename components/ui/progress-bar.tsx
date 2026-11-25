export function ProgressBar({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-3 flex-1 rounded-full bg-gray-700" role="progressbar" aria-label={label}
                aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${value}%` }} />
            </div>
            <span className="w-12 text-right text-sm font-bold text-gray-300">{value}%</span>
        </div>
    );
}
