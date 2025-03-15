export function formatDate(isoDate: string) {
	const date = new Date(isoDate);
	return new Intl.DateTimeFormat("en-In", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}
