export function sanitizeCpfCnpj(cpfCnpj: string): string {
    return cpfCnpj?.replace(/[^\w]/g, "");;
}