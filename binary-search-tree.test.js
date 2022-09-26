import {Tree} from './binary-search-tree';

let newTree = new Tree([5,13,9,2,43,36,12,12,13,38]);

describe('balanced BST functionality', () => {
    it('the root of the tree should be 12', () => {
        expect(newTree.root).toMatchObject({
            data: 12,
        });
    });

    it('insert() will insert a new node appropriately to the branches of the tree', () => {
        newTree.insert(4);
        expect(newTree.find(4)).toMatchObject({
            data: 4,
            leftBranch: null,
            rightBranch: null
        });
    });

    it('delete() will remove the node from the branches', () => {
        newTree.delete(4);
        expect(newTree.delete(4)).toMatchObject({
            data: 12,
            leftBranch: {
                data: 5,
                leftBranch: {
                    data: 2,
                    leftBranch: null,
                    rightBranch: null,
                },
                rightBranch: {
                    data: 9,
                    leftBranch: null,
                    rightBranch: null,
                },
            },
            rightBranch: {
                data: 36,
                leftBranch: {
                    data: 13,
                    leftBranch: null,
                    rightBranch: null,
                },
                rightBranch: {
                    data: 38,
                    leftBranch: null,
                    rightBranch: {
                        data: 43,
                        leftBranch: null,
                        rightBranch: null,
                    },
                },
            },
        });
    });

    it('height() will return the longest path from a given node to a leaf node', () => {
        expect(newTree.height(newTree.root)).toEqual(3);
    });
});

describe('BST traversal methods', () => {
    it('levelOrder() will return a breadth first search array of the tree values', () => {
        expect(newTree.levelOrder(newTree.root)).toEqual([12,5,36,2,9,13,38,43]);
    });

    it('inOrder() will traverse the tree in left-root-right order and return the values', () => {
        expect(newTree.inOrder(newTree.root)).toEqual([2,5,9,12,13,36,38,43]);
    });

    it('preOrder() will traverse the tree in root-left-right order and return the values', () => {
        expect(newTree.preOrder(newTree.root)).toEqual([12,5,2,9,36,13,38,43]);
    });

    it('postOrder() will traverse the tree in left-right-root order and return the values', () => {
        expect(newTree.postOrder(newTree.root)).toEqual([2,9,5,13,43,38,36,12]);
    });
});

describe('depth methods for balanced BST', () => {
    it('depth() of the root should be 0', () => {
        expect(newTree.depth(newTree.root)).toEqual(0);
    });

    it(`depth of the root's child should be 1`, () => {
        expect(newTree.depth(newTree.root.leftBranch)).toEqual(1);
    });
});

describe('isBalanced() method checks to see if the tree is balanced', () => {
    it('the tree will be balanced', () => {
        expect(newTree.isBalanced(newTree.root)).toBeTruthy();
    });

    it('adding large nodes to the tree will make it unbalanced', () => {
        newTree.insert(1234);
        newTree.insert(872);
        newTree.insert(1398);
        newTree.insert(4820);
        expect(newTree.isBalanced(newTree.root)).toBeFalsy();
    });
});

describe('reBalance() method rebalances the tree even with large values', () => {
    it('reBalance() should balance the tree with nodes that have values >100', () => {
        expect(newTree.reBalance(newTree.root)).toMatchObject({
            data: 36,
            leftBranch: {
                data: 9,
                leftBranch: {
                    data: 2,
                    leftBranch: null,
                    rightBranch: {
                        data: 5,
                        leftBranch: null,
                        rightBranch: null,
                    },
                },
                rightBranch: {
                    data: 12,
                    leftBranch: null,
                    rightBranch: {
                        data: 13,
                        leftBranch: null,
                        rightBranch: null,
                    },
                },
            },
            rightBranch: {
                data: 872,
                leftBranch: {
                    data: 38,
                    leftBranch: null,
                    rightBranch: {
                        data: 43,
                        leftBranch: null,
                        rightBranch: null,
                    },
                },
                rightBranch: {
                    data: 1398,
                    leftBranch: {
                        data: 1234,
                        leftBranch: null,
                        rightBranch: null,
                    },
                    rightBranch: {
                        data: 4820,
                        leftBranch: null,
                        rightBranch: null,
                    },
                },
            },
        });
    });
});
