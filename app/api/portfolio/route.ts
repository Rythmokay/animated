import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

// Helper to read data
function getPortfolioData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return null;
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading portfolio.json:', error);
    return null;
  }
}

// Helper to write data
function savePortfolioData(data: any) {
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing portfolio.json:', error);
    return false;
  }
}

export async function GET() {
  const data = getPortfolioData();
  if (!data) {
    return NextResponse.json({ error: 'Failed to read portfolio data' }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const success = savePortfolioData(body);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Portfolio updated successfully', data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
