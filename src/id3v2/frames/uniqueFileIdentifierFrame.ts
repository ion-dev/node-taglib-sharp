import Id3v2Tag from "../id3v2Tag";
import FrameTypes from "../frameTypes";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";

/**
 * Implements support for ID3v2 Unique File Identifier (UFID) frames.
 */
export default class UniqueFileIdentifierFrame extends Frame {
    private _identifier: ByteVector;
    private _owner: string;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance using the provided information
     * @param owner Owner of the new frame
     * @param identifier Identifier for the new frame
     */
    public static create(owner: string, identifier: ByteVector): UniqueFileIdentifierFrame {
        Guards.notNullOrUndefined(owner, "owner");

        const frame = new UniqueFileIdentifierFrame(new Id3v2FrameHeader(FrameTypes.UFID, 4));
        frame._owner = owner;
        frame._identifier = identifier;
        return frame;
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
    ): UniqueFileIdentifierFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new UniqueFileIdentifierFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): UniqueFileIdentifierFrame {
        const frame = new UniqueFileIdentifierFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.UniqueFileIdentifierFrame; }

    /**
     * Gets the owner of the current instance.
     * There should only be one frame with this owner per tag.
     */
    public get owner(): string { return this._owner; }

    /**
     * Gets the identifier data stored in the current instance.
     */
    public get identifier(): ByteVector { return this._identifier; }
    /**
     * Sets the identifier data stored in the current instance.
     */
    public set identifier(value: ByteVector) { this._identifier = value; }

    // #endregion

    // #region Methods

    /**
     * Gets a unique file identifier frame from a specified tag, optionally creating it if it does not
     * exist.
     * @param tag Object to search in
     * @param owner Owner to match
     * @param create Whether or not to create an add a new frame to the tag if a match is not found
     * @returns PopularimeterFrame Frame containing the matching user, `undefined` if a match was
     *     not found and {@paramref create} is `false`. A new frame is returned if
     *     {@paramref create} is `true`.
     */
    public static get(tag: Id3v2Tag, owner: string, create: boolean): UniqueFileIdentifierFrame {
        Guards.truthy(tag, "tag");

        const frames = tag.getFramesByClassType<UniqueFileIdentifierFrame>(FrameClassType.UniqueFileIdentifierFrame);
        let frame = frames.find((f) => f.owner === owner);

        if (frame || !create) { return frame; }

        // Create new frame
        frame = UniqueFileIdentifierFrame.create(owner, undefined);
        tag.addFrame(frame);
        return frame;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        const fields = data.split(ByteVector.getTextDelimiter(StringType.Latin1));
        if (fields.length !== 2) {
            return;
        }

        this._owner = fields[0].toString(StringType.Latin1);
        this._identifier = fields[1];
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        return ByteVector.fromByteVectors(
            ByteVector.fromString(this.owner, StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            this.identifier
        );
    }

    // #endregion
}