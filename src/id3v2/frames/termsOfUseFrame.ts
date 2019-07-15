import CorruptFileError from "../../corruptFileError";
import FrameTypes from "../frameTypes";
import Id3v2Tag from "../id3v2Tag";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";

export default class TermsOfUseFrame extends Frame {
    private _language: string;
    private _text: string;
    private _textEncoding: StringType = Id3v2Tag.defaultEncoding;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance with a specified language.
     * @param language ISO-639-2 language code for the new frame
     */
    public static fromLanguage(language: string): TermsOfUseFrame {
        const f = new TermsOfUseFrame(new Id3v2FrameHeader(FrameTypes.USER, 4));
        f._language = language;
        return f;
    }

    /**
     * Constructs and initializes a new instance with a specified language and encoding.
     * @param language ISO-639-2 language code for the new frame
     * @param encoding Text encoding to use when rendering the new frame
     */
    public static fromLanguageAndEncoding(language: string, encoding: StringType): TermsOfUseFrame {
        const f = new TermsOfUseFrame(new Id3v2FrameHeader(FrameTypes.USER, 4));
        f.textEncoding = encoding;
        f._language = language;
        return f;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data bytevector.
     * @param data Raw representation of the new frame
     * @param offset What offset in {@paramref data} the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at {@paramref data} in the data
     * @param version ID3v2 version the raw frame is encoded with. Must be positive 8-bit integer.
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): TermsOfUseFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new TermsOfUseFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): TermsOfUseFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new TermsOfUseFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.TermsOfUseFrame; }

    /**
     * Gets the ISO-639-2 language code stored in the current instance.
     */
    public get language(): string {
        return this._language && this._language.length > 2
            ? this._language.substring(0, 3)
            : "XXX";
    }
    /**
     * Sets the ISO-639-2 language code stored in the current instance.
     * There should only be one frame with a matching ISO-639-2 language code per tag.
     */
    public set language(value: string) { this._language = value; }

    /**
     * Gets the text of the terms of use
     */
    public get text(): string { return this._text; }
    /**
     * Sets the text of the terms of use
     */
    public set text(value: string) { this._text = value; }

    /**
     * Gets the text encoding to use when storing the current instance.
     */
    public get textEncoding(): StringType { return this._textEncoding; }
    /**
     * Sets the text encoding to use when storing the current instance.
     * This encoding is overridden when rendering if {@see Id3v2Tag.forceDefaultEncoding} is `true`
     * or the render version does not support it.
     * @param value Text encoding to use when storing the current instance
     */
    public set textEncoding(value: StringType) { this._textEncoding = value; }

    // #endregion

    // #region Public Methods

    /**
     * Gets a specified terms of use frame from the specified tag, optionally creating it if it
     * does not exist.
     * @param tag Object to search in
     * @param language Optionally, the ISO-639-2 language code to match
     * @param create Whether or not to create and add a new frame to the tag if a match is not
     *     found
     * @returns TermsOfUseFrame A matching frame if found or {@paramref create} is `true` of
     *     `undefined` if a matching frame is not found and {@paramref create} is `false`
     */
    public static get(tag: Id3v2Tag, language: string, create: boolean): TermsOfUseFrame {
        Guards.truthy(tag, "tag");

        const touFrames = tag.getFramesByClassType<TermsOfUseFrame>(FrameClassType.TermsOfUseFrame);
        let touFrame = touFrames.find((f) => !language || f.language === language);

        if (touFrame || !create) {
            return touFrame;
        }

        // Create a new frame
        touFrame = TermsOfUseFrame.fromLanguage(language);
        tag.addFrame(touFrame);
        return touFrame;
    }

    /**
     * Gets a specified terms of use frame from the specified tag, trying to match the language but
     * accepting one with a different language if a match was not found.
     * @param tag Object to search in
     * @param language ISO-639-2 language code to match
     * @returns TermsOfUseFrame Frame containing the matching frame or `undefined` if a match was
     *     not found.
     */
    public static getPreferred(tag: Id3v2Tag, language: string) {
        Guards.truthy(tag, "tag");

        let bestFrame: TermsOfUseFrame;
        const touFrames = tag.getFramesByClassType<TermsOfUseFrame>(FrameClassType.TermsOfUseFrame);
        for (const f of touFrames) {
            if (f.language === language) {
                return f;
            }
            if (!bestFrame) {
                bestFrame = f;
            }
        }

        return bestFrame;
    }

    /**
     * Returns a string representation of the frame.
     */
    public toString(): string { return this._text; }

    // #endregion

    // #region Protected Methods

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        if (data.length < 4) {
            throw new CorruptFileError("Not enough bytes in field");
        }

        this.textEncoding = data.get(0);
        this._language = data.toString(3, StringType.Latin1, 1);
        this.text = data.toString(data.length - 4, this.textEncoding, 4);
    }

    /** @inheritDoc */
    protected renderFields(version: number) {
        const encoding = Frame.correctEncoding(this.textEncoding, version);

        const v = ByteVector.empty();
        v.addByte(encoding);
        v.addByteVector(ByteVector.fromString(this.language, StringType.Latin1));
        v.addByteVector(ByteVector.fromString(this.text, encoding));

        return v;
    }

    // #endregion
}