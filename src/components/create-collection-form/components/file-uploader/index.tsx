"use client";
import { Box, Typography } from "@mui/material";
import React, { SetStateAction, useState } from "react";
import {
  FileUploaderRegular,
  OutputCollectionState,
  OutputCollectionStatus,
  OutputFileEntry,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Props {
  setImgSrc: React.Dispatch<SetStateAction<string | null>>;
}
export default function FileUploader({ setImgSrc }: Props) {
  const [files, setFiles] = useState<OutputFileEntry<"success">[]>([]);
  const { t } = useTranslation();
  const handleChangeEvent = (
    items: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">
  ) => {
    if (items?.allEntries[0]?.cdnUrl) {
      setImgSrc(items?.allEntries[0]?.cdnUrl);
    } else {
      setImgSrc(null);
    }
    setFiles([
      ...items.allEntries.filter((file) => file.status === "success"),
    ] as OutputFileEntry<"success">[]);
  };
  //  const result = uploadFile(fileData, {
  //    publicKey: "02283928ed99d99bb5d3",
  //    store: "auto",
  //    metadata: {
  //      subsystem: "js-client",
  //      pet: "cat",
  //    },
  //  }).then((res) => console.log(res.uuid));

  return (
    <Box>
      <Typography variant="caption">
        {t("commons:uploadCollectionImg")} {`(${t("commons:optionalStep")})`}
      </Typography>
      <FileUploaderRegular
        onChange={handleChangeEvent}
        pubkey="02283928ed99d99bb5d3"
      />
      <div>
        {files.map((file) => (
          <div key={file.uuid}>
            <Image
              src={file.cdnUrl}
              alt={file.fileInfo.originalFilename ?? ""}
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
    </Box>
  );
}
