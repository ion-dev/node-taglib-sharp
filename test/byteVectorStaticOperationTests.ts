import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import {ByteVector} from "../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000)) class ByteVectorAddTests {
    @test
    public InvalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(1, 0x00);

        // Act/Assert
        assert.throws(() => { ByteVector.add(undefined, undefined); });
        assert.throws(() => { ByteVector.add(undefined, bv); });
        assert.throws(() => { ByteVector.add(bv, undefined); });
        assert.throws(() => { ByteVector.add(null, null); });
        assert.throws(() => { ByteVector.add(null, bv); });
        assert.throws(() => { ByteVector.add(bv, null); });
    }

    @test
    public AddEmptyAndEmpty() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act
        const result = ByteVector.add(bv, bv);

        // Assert
        assert.isOk(result);
        assert.notEqual(result, bv);            // Make sure we got a new byte vector
        assert.isFalse(result.isReadOnly);
        assert.isTrue(result.isEmpty);
        assert.strictEqual(result.length, 0);
        assert.deepEqual(result.data, new Uint8Array([]));
    }

    @test
    public AddSomethingAndEmpty() {
        // Arrange
        const something = ByteVector.fromSize(1, 0x00);
        const empty = ByteVector.fromSize(0);

        // Act
        const result = ByteVector.add(something, empty);

        // Assert
        assert.isOk(result);
        assert.notEqual(result, something);            // Make sure we got a new byte vector
        assert.notEqual(result, empty);
        assert.isFalse(result.isReadOnly);
        assert.isFalse(result.isEmpty);
        assert.strictEqual(result.length, 1);
        assert.deepEqual(result.data, new Uint8Array([0x00]));
    }

    @test
    public AddEmptyAndSomething() {
        // Arrange
        const something = ByteVector.fromSize(1, 0x00);
        const empty = ByteVector.fromSize(0);

        // Act
        const result = ByteVector.add(empty, something);

        // Assert
        assert.isOk(result);
        assert.notEqual(result, something);            // Make sure we got a new byte vector
        assert.notEqual(result, empty);
        assert.isFalse(result.isReadOnly);
        assert.isFalse(result.isEmpty);
        assert.strictEqual(result.length, 1);
        assert.deepEqual(result.data, new Uint8Array([0x00]));
    }

    @test
    public AddSomethingAndSomething() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x03, 0x04]));

        // Act
        const result1 = ByteVector.add(bv1, bv2);
        const result2 = ByteVector.add(bv2, bv1);

        // Assert
        assert.isOk(result1);
        assert.isFalse(result1.isReadOnly);
        assert.isFalse(result1.isEmpty);
        assert.strictEqual(result1.length, 4);
        assert.deepEqual(result1.data, new Uint8Array([0x01, 0x02, 0x03, 0x04]));

        assert.isOk(result2);
        assert.isFalse(result2.isReadOnly);
        assert.isFalse(result2.isEmpty);
        assert.strictEqual(result2.length, 4);
        assert.deepEqual(result2.data, new Uint8Array([0x03, 0x04, 0x01, 0x02]));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorEqualTests {
    @test
    public BothNullUndefined() {
        // Arrange, Act, Assert
        assert.isTrue(ByteVector.equal(undefined, undefined));
        assert.isTrue(ByteVector.equal(null, null));
    }

    @test
    public MixedNullUndefined() {
        // Arrange, Act, Assert
        assert.isFalse(ByteVector.equal(undefined, null));
        assert.isFalse(ByteVector.equal(null, undefined));
    }

    @test
    public MixedFalsySomething() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act, Assert
        assert.isFalse(ByteVector.equal(undefined, bv));
        assert.isFalse(ByteVector.equal(bv, undefined));
        assert.isFalse(ByteVector.equal(null, bv));
        assert.isFalse(ByteVector.equal(bv, null));
    }

    @test
    public Equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.equal(bv1, bv2));
    }

    @test
    public NotEqual() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x03, 0x04]));

        // Act, Assert
        assert.isFalse(ByteVector.equal(bv1, bv2));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorNotEqualTests {
    @test
    public BothNullUndefined() {
        // Arrange, Act, Assert
        assert.isFalse(ByteVector.notEqual(undefined, undefined));
        assert.isFalse(ByteVector.notEqual(null, null));
    }

    @test
    public MixedNullUndefined() {
        // Arrange, Act, Assert
        assert.isTrue(ByteVector.notEqual(undefined, null));
        assert.isTrue(ByteVector.notEqual(null, undefined));
    }

    @test
    public MixedFalsySomething() {
        // Arrange
        const bv = ByteVector.fromSize(1);

        // Act, Assert
        assert.isTrue(ByteVector.notEqual(undefined, bv));
        assert.isTrue(ByteVector.notEqual(bv, undefined));
        assert.isTrue(ByteVector.notEqual(null, bv));
        assert.isTrue(ByteVector.notEqual(bv, null));
    }

    @test
    public Equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.notEqual(bv1, bv2));
    }

    @test
    public NotEqual() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x03, 0x04]));

        // Act, Assert
        assert.isTrue(ByteVector.notEqual(bv1, bv2));
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorGreaterThanTests {
    @test
    public InvalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act, Assert
        assert.throws(() => { ByteVector.greaterThan(undefined, undefined); });
        assert.throws(() => { ByteVector.greaterThan(null, undefined); });
        assert.throws(() => { ByteVector.greaterThan(bv, undefined); });
        assert.throws(() => { ByteVector.greaterThan(undefined, null); });
        assert.throws(() => { ByteVector.greaterThan(undefined, bv); });
        assert.throws(() => { ByteVector.greaterThan(null, null); });
    }

    @test
    public GreaterThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x03]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.greaterThan(bv1, bv2));    // bv1 > bv2 -> true
        assert.isFalse(ByteVector.greaterThan(bv2, bv1));   // bv2 > bv1 -> false
    }

    @test
    public LessThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x00]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.greaterThan(bv1, bv2));   // bv1 > bv2 -> false
        assert.isTrue(ByteVector.greaterThan(bv2, bv1));    // bv2 > bv1 -> true
    }

    @test
    public Equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.greaterThan(bv1, bv2));   // bv1 > bv2 -> false
        assert.isFalse(ByteVector.greaterThan(bv2, bv1));   // bv2 > bv1 -> false
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorGreaterThanEqualTests {
    @test
    public InvalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act, Assert
        assert.throws(() => { ByteVector.greaterThanEqual(undefined, undefined); });
        assert.throws(() => { ByteVector.greaterThanEqual(null, undefined); });
        assert.throws(() => { ByteVector.greaterThanEqual(bv, undefined); });
        assert.throws(() => { ByteVector.greaterThanEqual(undefined, null); });
        assert.throws(() => { ByteVector.greaterThanEqual(undefined, bv); });
        assert.throws(() => { ByteVector.greaterThanEqual(null, null); });
    }

    @test
    public GreaterThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x03]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.greaterThanEqual(bv1, bv2));    // bv1 > bv2 -> true
        assert.isFalse(ByteVector.greaterThanEqual(bv2, bv1));   // bv2 > bv1 -> false
    }

    @test
    public LessThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x00]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.greaterThanEqual(bv1, bv2));   // bv1 > bv2 -> false
        assert.isTrue(ByteVector.greaterThanEqual(bv2, bv1));    // bv2 > bv1 -> true
    }

    @test
    public Equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.greaterThanEqual(bv1, bv2));   // bv1 > bv2 -> true
        assert.isTrue(ByteVector.greaterThanEqual(bv2, bv1));   // bv2 > bv1 -> true
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorLessThanTests {
    @test
    public InvalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act, Assert
        assert.throws(() => { ByteVector.lessThan(undefined, undefined); });
        assert.throws(() => { ByteVector.lessThan(null, undefined); });
        assert.throws(() => { ByteVector.lessThan(bv, undefined); });
        assert.throws(() => { ByteVector.lessThan(undefined, null); });
        assert.throws(() => { ByteVector.lessThan(undefined, bv); });
        assert.throws(() => { ByteVector.lessThan(null, null); });
    }

    @test
    public GreaterThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x03]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.lessThan(bv1, bv2));      // bv1 < bv2 -> false
        assert.isTrue(ByteVector.lessThan(bv2, bv1));       // bv2 < bv1 -> true
    }

    @test
    public LessThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x00]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.lessThan(bv1, bv2));       // bv1 > bv2 -> false
        assert.isFalse(ByteVector.lessThan(bv2, bv1));      // bv2 < bv1 -> true
    }

    @test
    public Equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.lessThan(bv1, bv2));   // bv1 < bv2 -> false
        assert.isFalse(ByteVector.lessThan(bv2, bv1));   // bv2 < bv1 -> false
    }
}

@suite(timeout(3000), slow(1000)) class ByteVectorLessThanEqualTests {
    @test
    public InvalidParameters() {
        // Arrange
        const bv = ByteVector.fromSize(0);

        // Act, Assert
        assert.throws(() => { ByteVector.lessThanEqual(undefined, undefined); });
        assert.throws(() => { ByteVector.lessThanEqual(null, undefined); });
        assert.throws(() => { ByteVector.lessThanEqual(bv, undefined); });
        assert.throws(() => { ByteVector.lessThanEqual(undefined, null); });
        assert.throws(() => { ByteVector.lessThanEqual(undefined, bv); });
        assert.throws(() => { ByteVector.lessThanEqual(null, null); });
    }

    @test
    public GreaterThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x03]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isFalse(ByteVector.lessThanEqual(bv1, bv2));      // bv1 < bv2 -> false
        assert.isTrue(ByteVector.lessThanEqual(bv2, bv1));       // bv2 < bv1 -> true
    }

    @test
    public LessThan() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x00]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.lessThanEqual(bv1, bv2));       // bv1 > bv2 -> false
        assert.isFalse(ByteVector.lessThanEqual(bv2, bv1));      // bv2 < bv1 -> true
    }

    @test
    public Equal() {
        // Arrange
        const bv1 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));
        const bv2 = ByteVector.fromByteArray(new Uint8Array([0x01, 0x02]));

        // Act, Assert
        assert.isTrue(ByteVector.lessThanEqual(bv1, bv2));   // bv1 < bv2 -> true
        assert.isTrue(ByteVector.lessThanEqual(bv2, bv1));   // bv2 < bv1 -> true
    }
}