export class DashboardKpiDto {
    totalEmpleados: number;
    totalProyectosActivos: number;
    totalGastosAprobados: number;
    tasaAsistenciaHoy: number;
    distribucion9Box: {
        bajoDesempenoBajoPotencial: number;
        altoDesempenoAltoPotencial: number;
        bajoDesempenoAltoPotencial: number;
        altoDesempenoBajoPotencial: number;
        bajoDesempenoMedioPotencial: number;
        altoDesempenoMedioPotencial: number;
        medioDesempenoBajoPotencial: number;
        medioDesempenoMedioPotencial: number;
    };
}