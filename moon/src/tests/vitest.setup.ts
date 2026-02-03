/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import * as axeMatchers from 'vitest-axe/matchers'
import 'vitest-axe/extend-expect'
import type { AxeMatchers } from 'vitest-axe'
import '@testing-library/jest-dom'

declare module 'vitest' {
	interface Assertion<T = any> extends AxeMatchers {}
	interface AsymmetricMatchersContaining extends AxeMatchers {}
}

expect.extend(matchers)
expect.extend(axeMatchers)

// clean up the DOM after every test to prevent memory leaks
afterEach(() => {
	cleanup()
})

// mock ResizeObserver (commonly needed for responsive components like Modals/Drawers)
class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

class MockIntersectionObserver implements IntersectionObserver {
	readonly root: Element | null = null
	readonly rootMargin: string = ''
	readonly thresholds: ReadonlyArray<number> = []

	constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}

	disconnect() {}
	observe(_target: Element) {}
	unobserve(_target: Element) {}
	takeRecords(): IntersectionObserverEntry[] {
		return []
	}
}

global.IntersectionObserver = MockIntersectionObserver

global.ResizeObserver = ResizeObserverMock

// mock ScrollTo (Jsdom doesn't implement this, often used in Nav/Select components)
window.scrollTo = vi.fn()

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})

if (!Element.prototype.setPointerCapture) {
	Element.prototype.setPointerCapture = function () {}
}
if (!Element.prototype.releasePointerCapture) {
	Element.prototype.releasePointerCapture = function () {}
}
if (!Element.prototype.hasPointerCapture) {
	Element.prototype.hasPointerCapture = function () {
		return false
	}
}
