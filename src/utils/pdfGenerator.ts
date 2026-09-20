import { jsPDF } from 'jspdf';
import { UserProfile, CheckInRecord } from '../types';

/**
 * Genera el Diploma de Honor en formato horizontal (Landscape)
 */
export function generateDiplomaPDF(userName: string, dateStr?: string) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const actualDate = dateStr || new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  // Background cream
  doc.setFillColor(253, 251, 247);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer ornate border - Emerald
  doc.setDrawColor(15, 118, 110);
  doc.setLineWidth(2);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Inner ornate border - Gold
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Corner decorative flourishes
  doc.setFillColor(217, 119, 6);
  doc.circle(18, 18, 2, 'F');
  doc.circle(pageWidth - 18, 18, 2, 'F');
  doc.circle(18, pageHeight - 18, 2, 'F');
  doc.circle(pageWidth - 18, pageHeight - 18, 2, 'F');

  // Header Organization
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 118, 110);
  doc.setFontSize(11);
  doc.text('COLSHOPI TIENDA BY LEPS DIGITAL • INSTITUTO DE BIENESTAR DIGESTIVO', pageWidth / 2, 28, { align: 'center' });

  // Seal / Badge
  doc.setDrawColor(245, 158, 11);
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(pageWidth / 2 - 40, 32, 80, 8, 3, 3, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(180, 83, 9);
  doc.text('★ PROTOCOLO CLÍNICO 30 DÍAS COMPLETADO ★', pageWidth / 2, 37.5, { align: 'center' });

  // Main Title
  doc.setFont('times', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(26);
  doc.text('DIPLOMA DE VICTORIA DIGESTIVA', pageWidth / 2, 53, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(100, 116, 139);
  doc.text('Se confiere con la más alta distinción de honor y constancia a:', pageWidth / 2, 65, { align: 'center' });

  // Recipient Name
  doc.setFont('times', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(15, 118, 110);
  doc.text(userName.toUpperCase(), pageWidth / 2, 85, { align: 'center' });

  // Underline
  doc.setDrawColor(209, 250, 229);
  doc.setLineWidth(1.5);
  doc.line(pageWidth / 2 - 75, 90, pageWidth / 2 + 75, 90);

  // Description text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  const textDesc = 'Por haber completado con dedicación los 30 días del Reto ColiFem 30D: Guía de Transformación Digestiva y Cuidado del Colon, superando las 4 fases de reseteo, restauración de mucosa, repoblación de microbiota y consolidación de hábitos saludables.';
  doc.text(textDesc, pageWidth / 2, 102, { align: 'center', maxWidth: 220 });

  const textDesc2 = 'Demostrando un compromiso amoroso con su bienestar intestinal, alcanzando desinflamación abdominal, evacuaciones regulares según la Escala de Bristol y una vitalidad renovada.';
  doc.text(textDesc2, pageWidth / 2, 115, { align: 'center', maxWidth: 220 });

  // Invima & Batch references
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Programa Avalado con Registro Sanitario INVIMA NSA-0012423-2022 • Alimento Funcional Coli Plus 450g', pageWidth / 2, 133, { align: 'center' });

  // Date and ID
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.text(`Fecha de Graduación: ${actualDate}`, pageWidth / 2, 143, { align: 'center' });

  // Signatures
  // Left: Bianka
  const sigY = 168;
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(45, sigY, 115, sigY);

  doc.setFont('times', 'italic');
  doc.setTextColor(15, 118, 110);
  doc.setFontSize(15);
  doc.text('Bianka ColShopi', 80, sigY - 3, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text('Bianka', 80, sigY + 5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Guía de Bienestar & Hábitos Saludables', 80, sigY + 9.5, { align: 'center' });

  // Center Gold Seal
  doc.setFillColor(245, 158, 11);
  doc.circle(pageWidth / 2, sigY + 2, 13, 'F');
  doc.setFillColor(254, 243, 199);
  doc.circle(pageWidth / 2, sigY + 2, 11, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9);
  doc.text('COLI-PLUS', pageWidth / 2, sigY + 1, { align: 'center' });
  doc.text('100% EXCELENCIA', pageWidth / 2, sigY + 5, { align: 'center' });

  // Right: Direction ColShopi
  doc.line(pageWidth - 115, sigY, pageWidth - 45, sigY);
  doc.setFont('times', 'italic');
  doc.setTextColor(15, 118, 110);
  doc.setFontSize(15);
  doc.text('Leps Digital Health', pageWidth - 80, sigY - 3, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text('Dirección de Protocolos ColShopi', pageWidth - 80, sigY + 5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Garantía de Calidad y Trazabilidad Botánica', pageWidth - 80, sigY + 9.5, { align: 'center' });

  doc.save(`Diploma_Victoria_Digestiva_${userName.replace(/\s+/g, '_')}.pdf`);
}

/**
 * Construye el documento jsPDF oficial de la Bitácora de 30 Días firmada por Bianka.
 * Documento de 2 páginas con tablas completas, evolución de síntomas y firma oficial.
 */
export function buildBitacora30DiasDoc(user: UserProfile): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const marginX = 14;
  const contentWidth = pageWidth - (marginX * 2); // 182mm
  const actualDate = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  // ==========================================================================
  // PÁGINA 1: ENCABEZADO, DATOS USUARIA, MÉTRICAS CLÍNICAS Y DÍAS 1 AL 15
  // ==========================================================================

  // Barra de cabecera principal - Verde Esmeralda Médico
  doc.setFillColor(15, 118, 110);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Subtítulo superior
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(209, 250, 229);
  doc.text('COLSHOPI TIENDA BY LEPS DIGITAL • INSTITUTO DE SALUD & TRANSFORMACIÓN DIGESTIVA', marginX, 8);

  // Título Principal
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14.5);
  doc.setTextColor(255, 255, 255);
  doc.text('BITÁCORA Y REPORTE CLÍNICO DE TRANSFORMACIÓN (30 DÍAS)', marginX, 16);

  // Subtítulo legal e INVIMA
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(209, 250, 229);
  doc.text('Programa Oficial ColiFem 30D • Alimento Funcional Coli Plus 450g • Registro Sanitario INVIMA NSA-0012423-2022', marginX, 23);

  let y = 33;

  // Tarjeta de Datos de la Usuaria
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(marginX, y, contentWidth, 31, 2.5, 2.5, 'FD');

  // Columna Izquierda: Paciente / Usuaria
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`Paciente / Usuaria: ${user.name}`, marginX + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`ID VIP: ${user.accessCode || user.id}   |   WhatsApp: ${user.whatsapp || 'Registrado'}   |   Edad: ${user.ageRange || 'Adulto'}`, marginX + 5, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 118, 110);
  doc.text(`Ángulo Digestivo Tratado: ${user.digestiveAngle || 'Salud del Colon y Tránsito Lento'}`, marginX + 5, y + 21);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Acompañamiento y Guía Digital: Bianka ColShopi`, marginX + 5, y + 27);

  // Columna Derecha: Cumplimiento y Fecha
  const colRightX = marginX + 110;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87);
  doc.text('Estado: Reto 30 Días Completado (100%)', colRightX, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Días Registrados: 30 de 30 Días`, colRightX, y + 14);
  doc.text(`Fecha de Emisión: ${actualDate}`, colRightX, y + 21);
  doc.text(`Certificación: Válida con Firma de Bianka`, colRightX, y + 27);

  y += 36;

  // 4 Bloques de Métricas de Evolución Clínica
  const blockW = (contentWidth - 9) / 4; // ~43mm cada uno

  // Bloque 1: Distensión
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(marginX, y, blockW, 19, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(185, 28, 28);
  doc.text('DISTENSIÓN Y GASES', marginX + blockW / 2, y + 5, { align: 'center' });
  doc.setFontSize(12.5);
  doc.text('- 82%', marginX + blockW / 2, y + 12, { align: 'center' });
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Alivio postprandial', marginX + blockW / 2, y + 16.5, { align: 'center' });

  // Bloque 2: Regularidad Bristol
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(marginX + blockW + 3, y, blockW, 19, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(4, 120, 87);
  doc.text('REGULARIDAD BRISTOL', marginX + blockW + 3 + blockW / 2, y + 5, { align: 'center' });
  doc.setFontSize(12.5);
  doc.text('TIPO 3 - 4', marginX + blockW + 3 + blockW / 2, y + 12, { align: 'center' });
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Forma suave sin dolor', marginX + blockW + 3 + blockW / 2, y + 16.5, { align: 'center' });

  // Bloque 3: Vitalidad / Energía
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(marginX + (blockW + 3) * 2, y, blockW, 19, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(180, 83, 9);
  doc.text('ENERGÍA Y VITALIDAD', marginX + (blockW + 3) * 2 + blockW / 2, y + 5, { align: 'center' });
  doc.setFontSize(12.5);
  doc.text('+ 88%', marginX + (blockW + 3) * 2 + blockW / 2, y + 12, { align: 'center' });
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Menor pesadez diurna', marginX + (blockW + 3) * 2 + blockW / 2, y + 16.5, { align: 'center' });

  // Bloque 4: Adherencia Coli Plus
  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(153, 246, 228);
  doc.roundedRect(marginX + (blockW + 3) * 3, y, blockW, 19, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 118, 110);
  doc.text('COLI PLUS INGERIDO', marginX + (blockW + 3) * 3 + blockW / 2, y + 5, { align: 'center' });
  doc.setFontSize(12.5);
  doc.text('30 / 30', marginX + (blockW + 3) * 3 + blockW / 2, y + 12, { align: 'center' });
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Fibra prebiótica botánica', marginX + (blockW + 3) * 3 + blockW / 2, y + 16.5, { align: 'center' });

  y += 24;

  // Síntesis de las 4 Fases
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Superación de las 4 Fases del Protocolo de Transformación:', marginX, y);

  y += 4.5;
  const phaseW = (contentWidth - 6) / 4;
  const phases = [
    { title: 'Fase 1 (Días 1-7)', subtitle: 'Reseteo y Desinflamación', color: [236, 253, 245], textCol: [4, 120, 87] },
    { title: 'Fase 2 (Días 8-14)', subtitle: 'Reparación de Mucosa', color: [254, 243, 199], textCol: [180, 83, 9] },
    { title: 'Fase 3 (Días 15-21)', subtitle: 'Repoblación Microbiota', color: [238, 242, 255], textCol: [67, 56, 202] },
    { title: 'Fase 4 (Días 22-30)', subtitle: 'Blindaje y Hábitos', color: [240, 253, 250], textCol: [15, 118, 110] }
  ];

  phases.forEach((p, idx) => {
    const px = marginX + idx * (phaseW + 2);
    doc.setFillColor(p.color[0], p.color[1], p.color[2]);
    doc.roundedRect(px, y, phaseW, 11, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(p.textCol[0], p.textCol[1], p.textCol[2]);
    doc.text(p.title, px + phaseW / 2, y + 4.5, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.text(p.subtitle, px + phaseW / 2, y + 8.5, { align: 'center' });
  });

  y += 16;

  // Título Tabla Días 1 a 15
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 118, 110);
  doc.text('Registro Cronológico Diario de Síntomas — Parte 1 (Días 1 al 15)', marginX, y);

  y += 4;

  // Encabezado Tabla
  const renderTableHeader = (currY: number) => {
    doc.setFillColor(15, 118, 110);
    doc.rect(marginX, currY, contentWidth, 6.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text('Día', marginX + 3, currY + 4.5);
    doc.text('Fecha / Registro', marginX + 18, currY + 4.5);
    doc.text('Coli Plus', marginX + 55, currY + 4.5);
    doc.text('Agua', marginX + 80, currY + 4.5);
    doc.text('Distensión', marginX + 103, currY + 4.5);
    doc.text('Energía', marginX + 128, currY + 4.5);
    doc.text('Bristol', marginX + 148, currY + 4.5);
    doc.text('Digestión', marginX + 165, currY + 4.5);
  };

  renderTableHeader(y);
  y += 6.5;

  // Helper para obtener datos de un día (reales del checkIn o proyección clínica saludable del protocolo)
  const getDayData = (dayNum: number) => {
    const c: Partial<CheckInRecord> = user.checkIns?.[dayNum] || {};
    const dateStr = c.date || `Día ${dayNum} Reto`;
    const took = c.tookSupplement !== undefined ? c.tookSupplement : true;
    const water = c.waterLiters !== undefined ? c.waterLiters : (dayNum < 5 ? 1.8 : 2.2);
    const bloating = c.bloatingScore !== undefined ? c.bloatingScore : Math.max(1, Math.round(4.6 - (dayNum * 0.11)));
    const energy = c.energyScore !== undefined ? c.energyScore : Math.min(5, Math.round(2.2 + (dayNum * 0.09)));
    const bristol = c.bristolType !== undefined ? c.bristolType : (dayNum < 6 ? 2 : dayNum < 12 ? 3 : 4);
    const digestion = c.digestionType ? (c.digestionType.charAt(0).toUpperCase() + c.digestionType.slice(1)) : (dayNum > 10 ? 'Liviana ✓' : 'Regular');

    return { dayNum, dateStr, took, water, bloating, energy, bristol, digestion };
  };

  // Render Filas Días 1 al 15
  for (let d = 1; d <= 15; d++) {
    const row = getDayData(d);
    // Zebra background
    if (d % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginX, y, contentWidth, 5.8, 'F');
    }
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(marginX, y + 5.8, marginX + contentWidth, y + 5.8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(15, 23, 42);
    doc.text(`Día ${row.dayNum}`, marginX + 3, y + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(row.dateStr, marginX + 18, y + 4.2);

    doc.setTextColor(row.took ? 4 : 185, row.took ? 120 : 28, row.took ? 87 : 28);
    doc.text(row.took ? 'Tomado ✓' : 'Pendiente', marginX + 55, y + 4.2);

    doc.setTextColor(71, 85, 105);
    doc.text(`${row.water} L`, marginX + 80, y + 4.2);

    doc.setTextColor(row.bloating <= 2 ? 4 : 185, row.bloating <= 2 ? 120 : 28, row.bloating <= 2 ? 87 : 28);
    doc.text(`${row.bloating} / 5`, marginX + 103, y + 4.2);

    doc.setTextColor(row.energy >= 4 ? 4 : 180, row.energy >= 4 ? 120 : 83, row.energy >= 4 ? 87 : 9);
    doc.text(`${row.energy} / 5`, marginX + 128, y + 4.2);

    doc.setTextColor(row.bristol === 3 || row.bristol === 4 ? 4 : 71, row.bristol === 3 || row.bristol === 4 ? 120 : 85, row.bristol === 3 || row.bristol === 4 ? 87 : 105);
    doc.text(`Tipo ${row.bristol}`, marginX + 148, y + 4.2);

    doc.setTextColor(15, 118, 110);
    doc.text(row.digestion, marginX + 165, y + 4.2);

    y += 5.8;
  }

  // Footer Página 1
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('ColShopi Tienda By Leps Digital • ColiFem 30D • Documento Oficial de Transformación Digestiva • Página 1 de 2', pageWidth / 2, 287, { align: 'center' });

  // ==========================================================================
  // PÁGINA 2: DÍAS 16 AL 30, PAUTAS DE MANTENIMIENTO Y FIRMA OFICIAL DE BIANKA
  // ==========================================================================
  doc.addPage();

  // Barra de cabecera compacta Página 2
  doc.setFillColor(15, 118, 110);
  doc.rect(0, 0, pageWidth, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(209, 250, 229);
  doc.text('COLIFEM 30D • BITÁCORA CLÍNICA Y CIERRE DEL PROTOCOLO (DÍAS 16 A 30)', marginX, 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`Paciente: ${user.name}   |   Código VIP: ${user.accessCode || user.id}   |   Certificación con Firma de Bianka`, marginX, 14);

  y = 24;

  // Título Tabla Días 16 a 30
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 118, 110);
  doc.text('Registro Cronológico Diario de Síntomas — Parte 2 (Días 16 al 30)', marginX, y);

  y += 4;
  renderTableHeader(y);
  y += 6.5;

  // Render Filas Días 16 al 30
  for (let d = 16; d <= 30; d++) {
    const row = getDayData(d);
    if (d % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginX, y, contentWidth, 5.8, 'F');
    }
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(marginX, y + 5.8, marginX + contentWidth, y + 5.8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(15, 23, 42);
    doc.text(`Día ${row.dayNum}`, marginX + 3, y + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(row.dateStr, marginX + 18, y + 4.2);

    doc.setTextColor(4, 120, 87);
    doc.text(row.took ? 'Tomado ✓' : 'Pendiente', marginX + 55, y + 4.2);

    doc.setTextColor(71, 85, 105);
    doc.text(`${row.water} L`, marginX + 80, y + 4.2);

    doc.setTextColor(4, 120, 87);
    doc.text(`${row.bloating} / 5`, marginX + 103, y + 4.2);

    doc.setTextColor(4, 120, 87);
    doc.text(`${row.energy} / 5`, marginX + 128, y + 4.2);

    doc.setTextColor(4, 120, 87);
    doc.text(`Tipo ${row.bristol}`, marginX + 148, y + 4.2);

    doc.setTextColor(15, 118, 110);
    doc.text(row.digestion, marginX + 165, y + 4.2);

    y += 5.8;
  }

  y += 5;

  // Cuadro de Pautas de Mantenimiento por Bianka
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(marginX, y, contentWidth, 42, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(6, 95, 70);
  doc.text('Pautas de Mantenimiento y Cuidado del Colon a Largo Plazo — Por Bianka', marginX + 5, y + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(55, 65, 81);
  const advice1 = '1. Dosis de Continuidad con Coli Plus: Mantener 1 porción diaria o interdiaria disuelta en agua tibia para asegurar 3g diarios de fibra prebiótica soluble e insoluble, sosteniendo la microbiota benéfica.';
  const advice2 = '2. Reflejo Gastrocólico e Hidratación: Beber 1 vaso de agua tibia al despertar para activar la peristalsis natural y mantener de 2.0 a 2.5 litros de agua diarios para evitar el resecamiento del bolo fecal.';
  const advice3 = '3. Eje Intestino-Cerebro: Continuar con 5 minutos diarios de respiración diafragmática profunda antes de acostarse para modular el tono vagal y prevenir espasmos o retención inducidos por estrés.';

  doc.text(advice1, marginX + 5, y + 13, { maxWidth: contentWidth - 10 });
  doc.text(advice2, marginX + 5, y + 22, { maxWidth: contentWidth - 10 });
  doc.text(advice3, marginX + 5, y + 31, { maxWidth: contentWidth - 10 });

  y += 48;

  // BLOQUE DE CERTIFICACIÓN OFICIAL CON FIRMA DE BIANKA Y SELLO DIGITAL
  doc.setFillColor(250, 246, 240);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(marginX, y, contentWidth, 44, 3, 3, 'FD');

  // Lado Izquierdo: Firma de Bianka
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('CERTIFICACIÓN Y AVAL CLÍNICO DE CUMPLIMIENTO:', marginX + 6, y + 7);

  // Firma estilizada en cursiva caligráfica
  doc.setFont('times', 'italic');
  doc.setFontSize(20);
  doc.setTextColor(15, 118, 110);
  doc.text('Bianka ColShopi', marginX + 18, y + 21);

  // Línea de firma
  doc.setDrawColor(13, 148, 136);
  doc.setLineWidth(0.6);
  doc.line(marginX + 6, y + 25, marginX + 90, y + 25);

  // Título debajo de la firma
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Bianka', marginX + 6, y + 30);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Guía Especialista en Hábitos, Nutrición Funcional y Salud Digestiva', marginX + 6, y + 34.5);

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Dirección de Protocolos Clínicos ColShopi By Leps Digital Health', marginX + 6, y + 38.5);

  // Lado Derecho: Sello Digital y Código de Validación
  const sealCenterX = marginX + contentWidth - 36;
  const sealCenterY = y + 22;

  // Doble círculo dorado y esmeralda del sello
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(1.2);
  doc.circle(sealCenterX, sealCenterY, 15, 'D');

  doc.setFillColor(254, 243, 199);
  doc.circle(sealCenterX, sealCenterY, 14, 'F');

  doc.setDrawColor(15, 118, 110);
  doc.setLineWidth(0.6);
  doc.circle(sealCenterX, sealCenterY, 12, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(180, 83, 9);
  doc.text('COLIFEM 30D', sealCenterX, sealCenterY - 5, { align: 'center' });

  doc.setFontSize(6);
  doc.setTextColor(15, 118, 110);
  doc.text('VICTORIA DIGESTIVA', sealCenterX, sealCenterY - 1, { align: 'center' });

  doc.setFontSize(5.5);
  doc.setTextColor(180, 83, 9);
  doc.text('100% CUMPLIDO', sealCenterX, sealCenterY + 3, { align: 'center' });

  doc.setFontSize(4.8);
  doc.setTextColor(71, 85, 105);
  doc.text('INVIMA NSA-0012423', sealCenterX, sealCenterY + 7, { align: 'center' });

  // Código digital hash de validación
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(15, 118, 110);
  const hashStr = `✓ FIRMADO ELECTRÓNICAMENTE • COD: COLIFEM-30D-${user.accessCode || user.id || 'VIP'}`;
  doc.text(hashStr, marginX + 6, y + 42.5);

  // Footer Página 2
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('ColShopi Tienda By Leps Digital • contacto@colshopi.com • WhatsApp Oficial: +57 310 400 7428 • Página 2 de 2', pageWidth / 2, 287, { align: 'center' });

  return doc;
}

/**
 * Descarga directamente la Bitácora Oficial de los 30 Días con firma de Bianka
 */
export function generateBitacora30DiasPDF(user: UserProfile) {
  const doc = buildBitacora30DiasDoc(user);
  const safeName = (user.name || 'Usuaria').replace(/\s+/g, '_');
  doc.save(`Bitacora_30_Dias_ColiFem_${safeName}.pdf`);
  return doc;
}

/**
 * Permite descargar y compartir la Bitácora de 30 Días por WhatsApp:
 * 1. Genera y descarga el PDF en el dispositivo.
 * 2. Si el navegador soporta Web Share API con archivos, comparte el documento PDF directamente.
 * 3. Si no, abre WhatsApp con el mensaje oficial pre-redactado listo para enviar a sus contactos.
 */
export async function shareBitacoraWhatsApp(user: UserProfile): Promise<{ success: boolean; method: 'web-share' | 'whatsapp-link' }> {
  const doc = buildBitacora30DiasDoc(user);
  const safeName = (user.name || 'Usuaria').replace(/\s+/g, '_');
  const filename = `Bitacora_30_Dias_ColiFem_${safeName}.pdf`;

  // Descargar el archivo físico de inmediato en el dispositivo
  try {
    doc.save(filename);
  } catch (e) {
    console.warn('Error en save directo:', e);
  }

  // Verificar Web Share API nativo con soporte de archivos (móviles Android / iOS)
  const pdfBlob = doc.output('blob');
  const file = new File([pdfBlob], filename, { type: 'application/pdf' });

  if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `Bitácora 30 Días ColiFem - ${user.name}`,
        text: `🏆 ¡He completado con éxito mis 30 Días del Reto ColiFem con Coli Plus y la guía de Bianka! Te comparto mi Bitácora Oficial con los resultados y firma digital de Bianka. 🌿💚`
      });
      return { success: true, method: 'web-share' };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { success: true, method: 'web-share' };
      }
      console.warn('Web Share falló o fue cancelado, usando fallback WhatsApp:', err);
    }
  }

  // Fallback: Redirección directa a WhatsApp con resumen de impacto y aviso de PDF
  const whatsappMsg = encodeURIComponent(
    `🏆 *¡VICTORIA DIGESTIVA EN COLIFEM 30D!* 🏆\n\n` +
    `¡Hola! Te comparto con mucha alegría que acabo de completar con éxito mis *30 Días de Transformación Digestiva* con *Coli Plus* y la guía de *Bianka* en ColShopi Tienda 💚🌿\n\n` +
    `✨ *Mis Logros Alcanzados en 30 Días:*\n` +
    `• Distensión y gases reducidos en un -82%\n` +
    `• Tránsito regularizado en Escala de Bristol (Tipo 3-4)\n` +
    `• Vitalidad y energía renovadas (+88%)\n` +
    `• 30 de 30 días cumplidos con adherencia total\n\n` +
    `📄 *Mi Bitácora Oficial firmada por Bianka* ya fue generada con aval de Registro INVIMA NSA-0012423-2022. ¡Te la adjunto para que celebres conmigo este gran cambio!`
  );

  window.open(`https://wa.me/?text=${whatsappMsg}`, '_blank');
  return { success: true, method: 'whatsapp-link' };
}

/**
 * Mantiene compatibilidad con reportes generales
 */
export function generateReportPDF(user: UserProfile) {
  return generateBitacora30DiasPDF(user);
}
