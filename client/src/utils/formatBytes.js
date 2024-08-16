export default function formatBytes (bytes, decimals = 2) {
    if (!+bytes) return '0 Байт'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Байт', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}