import { CstNodeLocation } from "chevrotain"
import { DiagnosticSeverity } from "vscode-languageserver";

export interface WithLocation<T> {
	data: T,
	location: CstNodeLocation,
}
export interface AFFTimingEvent {
	kind: "timing",
	tagLocation: CstNodeLocation,
	time: WithLocation<AFFInt>,
	bpm: WithLocation<AFFFloat>,
	segment: WithLocation<AFFFloat>,
}

export interface AFFTapEvent {
	kind: "tap",
	time: WithLocation<AFFInt>,
	trackId: WithLocation<AFFTrackId>,
}

export interface AFFHoldEvent {
	kind: "hold",
	tagLocation: CstNodeLocation,
	start: WithLocation<AFFInt>,
	end: WithLocation<AFFInt>,
	trackId: WithLocation<AFFTrackId>,
}

export interface AFFArcEvent {
	kind: "arc",
	tagLocation: CstNodeLocation,
	start: WithLocation<AFFInt>,
	end: WithLocation<AFFInt>,
	xStart: WithLocation<AFFFloat>,
	xEnd: WithLocation<AFFFloat>,
	arcKind: WithLocation<AFFArcKind>,
	yStart: WithLocation<AFFFloat>,
	yEnd: WithLocation<AFFFloat>,
	colorId: WithLocation<AFFColorId>,
	effect: WithLocation<AFFEffect>,
	isLine: WithLocation<AFFBool>,
	arctaps?: WithLocation<WithLocation<AFFArctapEvent>[]>,
}

export interface AFFArctapEvent {
	kind: "arctap",
	tagLocation: CstNodeLocation,
	time: WithLocation<AFFInt>,
}

export type AFFItem = AFFTimingEvent | AFFTapEvent | AFFHoldEvent | AFFArcEvent
export type AFFEvent = AFFItem | AFFArctapEvent

export interface AFFInt {
	kind: "int",
	value: number,
}

export interface AFFFloat {
	kind: "float",
	value: number,
	digit: number,
}

export interface AFFWord {
	kind: "word",
	value: string
}

export type AFFValues = {
	int: AFFInt,
	float: AFFFloat,
	word: AFFWord,
}
export type AFFValue = AFFValues[keyof AFFValues]

export interface AFFTrackId {
	kind: "track-id",
	value: 1 | 2 | 3 | 4,
}
export const affTrackIds = new Set([1, 2, 3, 4])

export interface AFFColorId {
	kind: "color-id",
	value: 0 | 1 | 2,
}
export const affColorIds = new Set([0, 1, 2])

export interface AFFEffect {
	kind: "effect",
	value: "none" | "full" | "incremental"
}
export const affEffects = new Set(["none", "full", "incremental"])

export interface AFFArcKind {
	kind: "arc-kind",
	value: "b" | "s" | "si" | "so" | "sisi" | "siso" | "soso" | "sosi"
}
export const affArcKinds = new Set(["b", "s", "si", "so", "sisi", "siso", "soso", "sosi"])

export interface AFFBool {
	kind: "bool",
	value: boolean
}
export const affBools = new Set(["true", "false"])


export interface AFFBool {
	kind: "bool",
	value: boolean
}

export interface AFFMetadataEntry {
	key: WithLocation<string>,
	value: WithLocation<string>,
}

export interface AFFMetadata {
	data: Map<string, WithLocation<AFFMetadataEntry>>
	metaEndLocation: CstNodeLocation
}

export interface AFFFile {
	metadata: WithLocation<AFFMetadata>,
	items: WithLocation<AFFItem>[],
}

export interface AFFErrorRelatedInfo {
	message: string,
	location: CstNodeLocation,
}

export interface AFFError {
	message: string,
	location: CstNodeLocation,
	severity: DiagnosticSeverity,
	relatedInfo?: AFFErrorRelatedInfo[],
}

export type AFFChecker = (file: AFFFile, errors: AFFError[]) => void