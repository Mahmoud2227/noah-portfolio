import {IoSettings} from "react-icons/io5";

import S from "@sanity/desk-tool/structure-builder";

export default () =>
	S.list()
		.title("Content")
		.items([
			S.listItem()
				.icon(IoSettings)
				.title("Settings")
				.child(S.document().schemaType("siteSettings").documentId("siteSettings")),
			...S.documentTypeListItems().filter(
				(listItem) => !["siteSettings"].includes(listItem.getId())
			),
		]);
