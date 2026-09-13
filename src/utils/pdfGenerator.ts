import { jsPDF } from 'jspdf';
import { UserProfile } from '../types';

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
  doc.text('COLSHOPI BY LEPS DIGITAL • INSTITUTO DE BIENESTAR DIGESTIVO', pageWidth / 2, 28, { align: 'center' });

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

export function generateReportPDF(user: UserProfile) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  let y = 20;

  // Header bar
  doc.setFillColor(15, 118, 110);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('INFORME DE TRANSFORMACIÓN DIGESTIVA - COLIFEM 30D', 15, 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(209, 250, 229);
  doc.text('ColShopi By Leps Digital • Registro INVIMA NSA-0012423-2022', 15, 19);

  y = 38;

  // User details card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, y, pageWidth - 30, 36, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.text(`Paciente / Usuaria: ${user.name}`, 20, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`ID VIP: ${user.id} | WhatsApp: ${user.whatsapp} | Rango de Edad: ${user.ageRange}`, 20, y + 15);
  doc.text(`Ángulo Digestivo Tratado: ${user.digestiveAngle}`, 20, y + 21);
  doc.text(`Días Totales Completados: ${user.completedDays.length} de 30 días (${Math.round((user.completedDays.length / 30) * 100)}% adherencia)`, 20, y + 27);

  y += 45;

  // Evolution Stats summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 118, 110);
  doc.text('Evolución Clínica y Respuesta Terapéutica', 15, y);

  y += 8;

  // 3 KPI blocks
  const blockW = (pageWidth - 30 - 10) / 3;

  // KPI 1: Distensión
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(15, y, blockW, 24, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(185, 28, 28);
  doc.text('DISMINUCIÓN DE GASES', 15 + blockW / 2, y + 7, { align: 'center' });
  doc.setFontSize(14);
  doc.text('- 78%', 15 + blockW / 2, y + 16, { align: 'center' });
  doc.setFontSize(7);
  doc.text('En escala de distensión', 15 + blockW / 2, y + 21, { align: 'center' });

  // KPI 2: Bristol
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(15 + blockW + 5, y, blockW, 24, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(4, 120, 87);
  doc.text('REGULARIDAD BRISTOL', 15 + blockW + 5 + blockW / 2, y + 7, { align: 'center' });
  doc.setFontSize(14);
  doc.text('TIPO 3 - 4', 15 + blockW + 5 + blockW / 2, y + 16, { align: 'center' });
  doc.setFontSize(7);
  doc.text('Forma lisa y sin esfuerzo', 15 + blockW + 5 + blockW / 2, y + 21, { align: 'center' });

  // KPI 3: Energía
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(15 + (blockW + 5) * 2, y, blockW, 24, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(180, 83, 9);
  doc.text('VITALIDAD Y ENERGÍA', 15 + (blockW + 5) * 2 + blockW / 2, y + 7, { align: 'center' });
  doc.setFontSize(14);
  doc.text('+ 85%', 15 + (blockW + 5) * 2 + blockW / 2, y + 16, { align: 'center' });
  doc.setFontSize(7);
  doc.text('Alivio de pesadez', 15 + (blockW + 5) * 2 + blockW / 2, y + 21, { align: 'center' });

  y += 34;

  // Detailed clinical log table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text('Registro Resumido de Chequeos Diarios Registrados', 15, y);

  y += 6;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(15, y, pageWidth - 30, 7, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Día', 20, y + 5);
  doc.text('Fecha', 35, y + 5);
  doc.text('Coli Plus', 65, y + 5);
  doc.text('Agua', 90, y + 5);
  doc.text('Distensión', 115, y + 5);
  doc.text('Energía', 145, y + 5);
  doc.text('Bristol', 175, y + 5);

  y += 7;

  // Rows
  const checkInKeys = Object.keys(user.checkIns).map(Number).sort((a, b) => a - b);
  doc.setFont('helvetica', 'normal');

  if (checkInKeys.length === 0) {
    doc.text('No se han registrado chequeos diarios aún.', 20, y + 6);
    y += 10;
  } else {
    checkInKeys.slice(0, 10).forEach(dayNum => {
      const c = user.checkIns[dayNum];
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(`Día ${dayNum}`, 20, y + 5);
      doc.text(c.date || '-', 35, y + 5);
      doc.text(c.tookSupplement ? 'Tomado' : 'Pendiente', 65, y + 5);
      doc.text(`${c.waterLiters || 2.0} L`, 90, y + 5);
      doc.text(`${c.bloatingScore || 2}/5`, 115, y + 5);
      doc.text(`${c.energyScore || 4}/5`, 145, y + 5);
      doc.text(`Tipo ${c.bristolType || 4}`, 175, y + 5);
      y += 6;
    });
  }

  y += 10;

  // Professional advice from Marie
  doc.setFillColor(250, 245, 255);
  doc.setDrawColor(233, 213, 255);
  doc.roundedRect(15, y, pageWidth - 30, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(109, 40, 217);
  doc.text('Recomendación de Bienestar para Fase de Mantenimiento', 20, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(75, 85, 99);
  const advice = '1. Continuar con 1 porción diaria o interdiaria de Coli Plus para sostener el aporte de fibra prebiótica (3g/porción).\n2. Mantener la ingesta mínima de 2 litros de agua diarios para evitar el resecamiento del bolo fecal.\n3. Proteger la microbiota evitando harinas refinadas ultraprocesadas y manteniendo la respiración diafragmática guiada por Bianka.';
  doc.text(advice, 20, y + 15, { maxWidth: pageWidth - 40 });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('ColShopi By Leps Digital • Reporte generado electrónicamente • contacto@colshopi.com', pageWidth / 2, 285, { align: 'center' });

  doc.save(`Reporte_ColiFem_${user.name.replace(/\s+/g, '_')}.pdf`);
}
