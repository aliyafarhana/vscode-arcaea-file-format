import { DiagnosticSeverity } from "vscode-languageserver"
import { AFFChecker, AFFFloat, AFFError, WithLocation } from "../types";

export const floatDigitChecker: AFFChecker = (file, errors) => {
	for (const { data } of file.items) {
		if (data.kind === "timing") {
			checkFloat(data.bpm, errors)
			checkFloat(data.segment, errors)
		} else if (data.kind === "arc") {
			checkFloat(data.xStart, errors)
			checkFloat(data.xEnd, errors)
			checkFloat(data.yStart, errors)
			checkFloat(data.yEnd, errors)
		}
	}
}

const checkFloat = (float: WithLocation<AFFFloat>, errors: AFFError[]) => {
	if (float.data.digit !== 2) {
		errors.push({
			message: `Float values should have exact 2 digits in its fractional part.`,
			severity: DiagnosticSeverity.Warning,
			location: float.location,
		})
	}
}