import type { Warband } from '../types/index.js';
import { exportWarbandToMDFile, importWarbandFromJSON, saveWarbandLocal } from './export.js';
import { readFileAsText } from './fileImport.js';
import { buildShareUrl } from './shareUrl.js';

type FlashMessage = (text: string, ok: boolean) => void;

interface HandleNewBuildArgs {
  hasUnsavedContent: boolean;
  setShowNewBuildConfirm: (show: boolean) => void;
  createFreshWarband: () => void;
}

export function handleNewBuildAction({
  hasUnsavedContent,
  setShowNewBuildConfirm,
  createFreshWarband,
}: HandleNewBuildArgs): void {
  if (hasUnsavedContent) {
    setShowNewBuildConfirm(true);
    return;
  }
  createFreshWarband();
}

interface HandleConfirmNewBuildArgs {
  saveFirst: boolean;
  warband: Warband;
  setShowNewBuildConfirm: (show: boolean) => void;
  createFreshWarband: () => void;
  flashMsg: FlashMessage;
  saveAndNewMessage: string;
}

export function handleConfirmNewBuildAction({
  saveFirst,
  warband,
  setShowNewBuildConfirm,
  createFreshWarband,
  flashMsg,
  saveAndNewMessage,
}: HandleConfirmNewBuildArgs): void {
  setShowNewBuildConfirm(false);
  if (saveFirst) saveWarbandLocal(warband);
  createFreshWarband();
  if (saveFirst) flashMsg(saveAndNewMessage, true);
}

interface HandleSaveLocalArgs {
  warband: Warband;
  flashMsg: FlashMessage;
  successMessage: string;
}

export function handleSaveLocalAction({ warband, flashMsg, successMessage }: HandleSaveLocalArgs): void {
  saveWarbandLocal(warband);
  flashMsg(successMessage, true);
}

interface HandleExportMdArgs {
  warband: Warband;
  flashMsg?: FlashMessage;
  errorMessage?: string;
}

export async function handleExportMarkdownAction({ warband, flashMsg, errorMessage }: HandleExportMdArgs): Promise<void> {
  try {
    await exportWarbandToMDFile(warband);
  } catch {
    if (flashMsg && errorMessage) flashMsg(errorMessage, false);
  }
}

interface HandleShareUrlArgs {
  faction: string;
  subfaction: string;
  pointLimit: number;
  gloryLimit: number;
  warband: Warband;
  flashMsg: FlashMessage;
  successMessage: string;
  failureMessage: string;
}

export async function handleShareUrlAction({
  faction,
  subfaction,
  pointLimit,
  gloryLimit,
  warband,
  flashMsg,
  successMessage,
  failureMessage,
}: HandleShareUrlArgs): Promise<void> {
  try {
    const url = await buildShareUrl({
      faction,
      subfaction,
      pointLimit,
      gloryLimit,
      warband,
    });
    await navigator.clipboard.writeText(url);
    flashMsg(successMessage, true);
  } catch {
    flashMsg(failureMessage, false);
  }
}

interface HandleImportFromFileArgs {
  file: File;
  onImported: (warband: Warband) => void;
  onSuccess?: (warband: Warband) => void;
  flashMsg: FlashMessage;
  invalidMessage: string;
}

export async function handleImportFromFileAction({
  file,
  onImported,
  onSuccess,
  flashMsg,
  invalidMessage,
}: HandleImportFromFileArgs): Promise<void> {
  try {
    const text = await readFileAsText(file);
    const imported = importWarbandFromJSON(text);
    if (!imported) {
      flashMsg(invalidMessage, false);
      return;
    }
    onImported(imported);
    if (onSuccess) onSuccess(imported);
  } catch {
    flashMsg(invalidMessage, false);
  }
}

interface HandleImportFromPasteArgs {
  importText: string;
  onImported: (warband: Warband) => void;
  onSuccess?: (warband: Warband) => void;
  flashMsg: FlashMessage;
  invalidMessage: string;
}

export function handleImportFromPasteAction({
  importText,
  onImported,
  onSuccess,
  flashMsg,
  invalidMessage,
}: HandleImportFromPasteArgs): void {
  const imported = importWarbandFromJSON(importText);
  if (!imported) {
    flashMsg(invalidMessage, false);
    return;
  }
  onImported(imported);
  if (onSuccess) onSuccess(imported);
}
