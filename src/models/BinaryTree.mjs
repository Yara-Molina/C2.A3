class BinaryTree {
    constructor() {
        this.tree = []; 
    }

    insert(value) {
        this.tree.push(value); 
    }

    getLeftChild(i) {
        const leftIndex = 2 * i + 1;
        if (leftIndex < this.tree.length) {
            return this.tree[leftIndex];
        }
        return null; 
    }

    getRightChild(i) {
        const rightIndex = 2 * i + 2;
        if (rightIndex < this.tree.length) {
            return this.tree[rightIndex];
        }
        return null; 
    }
    
    getParent(i) {
        if (i <= 0 || i >= this.tree.length) {
            return null; 
        }
        const parentIndex = Math.floor((i - 1) / 2);
        return this.tree[parentIndex];
    }

    printTree() {
        console.log(this.tree);
    }
}