export interface IDbResponse<T=any[]> {
    rows: T[],
    rowCount: number
}