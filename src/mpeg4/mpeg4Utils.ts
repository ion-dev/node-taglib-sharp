import Mpeg4BoxHeader from "./mpeg4BoxHeader";
import { ByteVector } from "../byteVector";

/**
 * Collection of utilities for interacting with MPEG4 files.
 */
export default class Mpeg4Utils {
    /**
     * Fixes a 3 byte ID.
     * @param id A @see ByteVector object containing an ID to fix.
     * @returns A fixed @see ByteVector or undefined if the ID could not be fixed.
     */
    public static fixId(id: ByteVector): ByteVector {
        if (id.length === 4) {
            if(id.isReadOnly){
                return id;
            }

            return id.toByteVector().makeReadOnly();
        }

        if (id.length === 3) {
            return ByteVector.fromByteArray([0xa9, id.get(0), id.get(1), id.get(2)]).makeReadOnly();
        }

        return undefined;
    }

    /**
     * Adds a parent to the end of an existing list of parents.
     * @param parents A @see Mpeg4BoxHeader[] object containing an existing list of parents.
     * @param current A @see Mpeg4BoxHeader object to add to the list.
     * @returns A @see Mpeg4BoxHeader[] object containing the list
     * of parents, including the added header.
     */
    public static addParent(parents: Mpeg4BoxHeader[], current: Mpeg4BoxHeader): Mpeg4BoxHeader[] {
        const boxes: Mpeg4BoxHeader[] = [];

        if (parents) {
            boxes.push(...parents);
        }

        boxes.push(current);

        return boxes;
    }
}
